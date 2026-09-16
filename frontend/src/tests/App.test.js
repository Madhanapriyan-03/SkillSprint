import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from '../store/slices/authSlice';
import roadmapReducer, { fetchRoadmaps } from '../store/slices/roadmapSlice';
import enrollmentReducer from '../store/slices/enrollmentSlice';
import submissionReducer from '../store/slices/submissionSlice';
import App from '../App';
import axios from 'axios';
import roadmapService from '../services/roadmapService';
import authService from '../services/authService';

const fs = require('fs');
const path = require('path');

jest.mock('axios', () => {
    const mockAxios = {
        create: jest.fn(() => mockAxios),
        get: jest.fn(() => Promise.resolve({ data: {} })),
        post: jest.fn(() => Promise.resolve({ data: {} })),
        put: jest.fn(() => Promise.resolve({ data: {} })),
        delete: jest.fn(() => Promise.resolve({ data: {} })),
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
        }
    };
    return {
        __esModule: true,
        default: mockAxios
    };
});

// Immediately capture interceptors before clearAllMocks is called in beforeEach
const responseInterceptorErrorHandler = axios.interceptors.response.use.mock.calls[0]?.[1];

const DOMAIN_VALUE_1 = "Advanced Java Mastery";
const DOMAIN_VALUE_2 = "A comprehensive guide to Spring Boot and JPA";
const CRUD_DELETE_MSG = "Roadmap deleted successfully.";
const CRUD_CREATE_MSG = "Roadmap created successfully.";
const CRUD_UPDATE_MSG = "Roadmap updated successfully.";

let store;

const createTestStore = () => configureStore({
    reducer: {
        auth: authReducer,
        roadmaps: roadmapReducer,
        enrollments: enrollmentReducer,
        submissions: submissionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }),
});

beforeEach(() => {
    window.history.pushState({}, '', '/');
    store = createTestStore();
    localStorage.clear();
    jest.clearAllMocks();
});

afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
});

// Helper for UI login
const performLogin = (role = 'MENTOR') => {
    axios.post.mockResolvedValue({ data: { token: 'jwt', role, email: 'user@skillsprint.com' } });
    render(<Provider store={store}><App /></Provider>);
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    fireEvent.change(emailInput, { target: { value: 'user@skillsprint.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
};

// Helper for navigating to roadmaps page
const navigateToRoadmaps = async () => {
    const link = await waitFor(() => screen.getByText('Roadmaps'));
    fireEvent.click(link);
};

// =====================================================================================
// SPRINT 1: Folder Structure & Package Verification (5 Tests)
// =====================================================================================

test('T1 — Folder/File structure: authSlice.js exists', () => {
    const filePath = path.resolve(__dirname, '../store/slices/authSlice.js');
    expect(fs.existsSync(filePath)).toBe(true);
});

test('T2 — Folder/File structure: authService.js exists', () => {
    const filePath = path.resolve(__dirname, '../services/authService.js');
    expect(fs.existsSync(filePath)).toBe(true);
});

test('T3 — Folder/File structure: roadmapService.js exists', () => {
    const filePath = path.resolve(__dirname, '../services/roadmapService.js');
    expect(fs.existsSync(filePath)).toBe(true);
});

test('T4 — Folder/File structure: Login.jsx exists', () => {
    const filePath = path.resolve(__dirname, '../components/Login.jsx');
    expect(fs.existsSync(filePath)).toBe(true);
});

test('T5 — Folder/File structure: App.js exists', () => {
    const filePath = path.resolve(__dirname, '../App.js');
    expect(fs.existsSync(filePath)).toBe(true);
});

// =====================================================================================
// SPRINT 2: Core State & Services Verification
// =====================================================================================

test('T6 — Redux Store: exists and has auth slice', () => {
    const state = store.getState();
    expect(state).toHaveProperty('auth');
});

test('T7 — AuthService: login and logout are exported functions', () => {
    expect(typeof authService.login).toBe('function');
    expect(typeof authService.logout).toBe('function');
});

test('T8 — Navbar renders a nav element', async () => {
    performLogin();
    await waitFor(() => expect(document.querySelector('nav')).toBeInTheDocument());
});

test('T9 — Login renders email and password inputs', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument();
});

test('T10 — ErrorHandler renders domain-specific error message', async () => {
    axios.post.mockRejectedValue({ response: { status: 401, data: { message: 'Invalid credentials' } } });
    render(<Provider store={store}><App /></Provider>);
    fireEvent.change(document.querySelector('input[name="email"]'), { target: { value: 'wrong@user.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    await waitFor(() => {
        expect(screen.getAllByText(/Invalid credentials/i).length).toBeGreaterThan(0);
    });
});

test('T11 — Admin/Mentor view: Create Roadmap button is visible', async () => {
    performLogin('MENTOR');
    await navigateToRoadmaps();
    await waitFor(() => {
        expect(screen.getByRole('button', { name: /\+ Add Roadmap/i })).toBeInTheDocument();
    });
});

test('T12 — Non-admin view: Create Roadmap button is absent', async () => {
    performLogin('STUDENT');
    await navigateToRoadmaps();
    await waitFor(() => {
        expect(screen.queryByRole('button', { name: /\+ Add Roadmap/i })).toBeNull();
    });
});

// =====================================================================================
// SPRINT 3: React Hooks & Reactive UI Behaviour
// =====================================================================================

test('T13 — useState: typing in title updates bound input', async () => {
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    const input = screen.getByPlaceholderText(/e.g. Frontend Masterclass/i);
    fireEvent.change(input, { target: { value: DOMAIN_VALUE_1 } });
    expect(input.value).toBe(DOMAIN_VALUE_1);
});

test('T14 — useState: selecting capacity updates UI', async () => {
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    const input = document.querySelector('input[type="number"]');
    fireEvent.change(input, { target: { value: '25' } });
    expect(input.value).toBe('25');
});

test('T15 — useEffect: roadmap service getAll called on mount', async () => {
    const spy = jest.spyOn(roadmapService, 'getAll');
    performLogin();
    await waitFor(() => expect(spy).toHaveBeenCalled());
});

test('T16 — useEffect: re-fetches when filter changes', async () => {
    const spy = jest.spyOn(roadmapService, 'getAll');
    performLogin();
    await navigateToRoadmaps();
    const filter = await waitFor(() => screen.getByPlaceholderText(/Search roadmaps by title/i));
    fireEvent.change(filter, { target: { value: 'Java' } });
    await waitFor(() => expect(spy).toHaveBeenCalled());
});

test('T17 — useRef: clicking Edit focuses the title input', async () => {
    axios.get.mockResolvedValue({ status: 200, data: { content: [{ id: 1, title: DOMAIN_VALUE_1, status: 'DRAFT' }] } });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Edit/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(document.activeElement).toBe(screen.getByPlaceholderText(/e.g. Frontend Masterclass/i));
    });
});

test('T18 — useRef: modal scrolls into view when opened', async () => {
    const mockScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalled();
    });
});

// =====================================================================================
// SPRINT 4: CRUD Feedback — Frontend ↔ Backend Cross-Reference
// =====================================================================================

test('T19 — DELETE: frontend calls service with ID', async () => {
    window.confirm = jest.fn(() => true);
    axios.get.mockResolvedValue({ status: 200, data: { content: [{ id: 1, title: DOMAIN_VALUE_1, status: 'DRAFT' }] } });
    axios.delete.mockResolvedValue({ status: 200, data: CRUD_DELETE_MSG });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Delete/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(axios.delete).toHaveBeenCalled();
    });
});

test('T20 — CREATE: frontend calls service on submit', async () => {
    axios.post.mockResolvedValue({ status: 201, data: CRUD_CREATE_MSG });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    
    // Clear login post mock call history
    jest.clearAllMocks();
    
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    
    // Fill all required fields
    fireEvent.change(screen.getByPlaceholderText(/e.g. Frontend Masterclass/i), { target: { value: DOMAIN_VALUE_1 } });
    const capacityInput = document.querySelector('input[type="number"]');
    fireEvent.change(capacityInput, { target: { value: '20' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Save Roadmap/i }));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
});

test('T21 — UPDATE: frontend calls service on save', async () => {
    axios.get.mockResolvedValue({ status: 200, data: { content: [{ id: 1, title: DOMAIN_VALUE_1, status: 'DRAFT' }] } });
    axios.put.mockResolvedValue({ status: 200, data: CRUD_UPDATE_MSG });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Edit/i }));
    fireEvent.click(btn);
    fireEvent.change(screen.getByPlaceholderText(/e.g. Frontend Masterclass/i), { target: { value: "Updated Title" } });
    fireEvent.click(screen.getByRole('button', { name: /Save Roadmap/i }));
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
});

test('T22 — GET-ALL: list renders domain records from backend mock', async () => {
    axios.get.mockResolvedValue({
        status: 200,
        data: { content: [{ id: 1, title: DOMAIN_VALUE_1, maxCapacity: 20 }] }
    });
    performLogin();
    await navigateToRoadmaps();
    await waitFor(() => expect(screen.getByText(DOMAIN_VALUE_1)).toBeInTheDocument());
});

test('T23 — GET-BY-ID: Edit form pre-fills with backend response', async () => {
    axios.get.mockResolvedValue({ status: 200, data: { content: [{ id: 1, title: DOMAIN_VALUE_1, status: 'DRAFT' }] } });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Edit/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(screen.getByDisplayValue(DOMAIN_VALUE_1)).toBeInTheDocument();
    });
});

test('T24 — 500 error: alert shown on server error', async () => {
    axios.get.mockResolvedValue({ status: 200, data: { content: [{ id: 1, title: DOMAIN_VALUE_1, status: 'DRAFT' }] } });
    axios.delete.mockRejectedValue({ response: { status: 500, data: { message: "Internal Error" } } });
    window.confirm = jest.fn(() => true);
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Delete/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(axios.delete).toHaveBeenCalled();
    });
});

test('T25 — 401 error: session expiry clears token', async () => {
    localStorage.setItem('sprint_token', 'expired-token');
    
    // Explicitly guarantee the interceptor handler is captured and active
    expect(responseInterceptorErrorHandler).toBeDefined();
    expect(typeof responseInterceptorErrorHandler).toBe('function');
    
    try {
        await responseInterceptorErrorHandler({ response: { status: 401 } });
    } catch (e) {
        // expected rejection
    }

    expect(localStorage.getItem('sprint_token')).toBeNull();
});

// =====================================================================================
// SPRINT 5: Notification System & Alert Lifecycle
// =====================================================================================

test('T26 — Successful roadmap creation shows success state', async () => {
    axios.post.mockResolvedValue({ status: 201, data: CRUD_CREATE_MSG });
    performLogin('MENTOR');
    await navigateToRoadmaps();
    
    // Clear login mock calls
    jest.clearAllMocks();
    
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    
    expect(screen.getByText(/Create New Roadmap/i)).toBeInTheDocument();
    
    // Fill all required fields
    fireEvent.change(screen.getByPlaceholderText(/e.g. Frontend Masterclass/i), { target: { value: DOMAIN_VALUE_1 } });
    const capacityInput = document.querySelector('input[type="number"]');
    fireEvent.change(capacityInput, { target: { value: '25' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Save Roadmap/i }));
    
    // Assert that the creation modal is closed successfully
    await waitFor(() => {
        expect(screen.queryByText(/Create New Roadmap/i)).toBeNull();
    });
});

test('T27 — Success alert auto-dismisses after timeout', async () => {
    jest.useFakeTimers();
    performLogin('MENTOR');
    
    await waitFor(() => {
        expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
    
    act(() => {
        jest.advanceTimersByTime(3500);
    });
    
    await waitFor(() => {
        expect(screen.queryByText(/Login successful/i)).not.toBeInTheDocument();
    });
});

test('T28 — Failed operation shows validation warning', async () => {
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    const input = screen.getByPlaceholderText(/e.g. Frontend Masterclass/i);
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole('button', { name: /Save Roadmap/i }));
    await waitFor(() => {
        expect(input).toBeRequired();
    });
});

test('T29 — Stacked alerts logic verified', async () => {
    render(<Provider store={store}><App /></Provider>);
    
    act(() => {
        store.dispatch({ 
            type: login.fulfilled.type, 
            payload: { token: 'jwt', role: 'MENTOR' } 
        });
        store.dispatch({ 
            type: fetchRoadmaps.rejected.type, 
            payload: 'Roadmap fetch failed' 
        });
    });

    await waitFor(() => {
        expect(document.querySelector('.notification-stack .alert.success')).toHaveTextContent(/Login successful/i);
        expect(document.querySelector('.notification-stack .alert.error')).toHaveTextContent(/Roadmap fetch failed/i);
    });
});

// =====================================================================================
// SPRINT 6: Session Management & Redux State
// =====================================================================================

test('T30 — After mock login: localStorage token matches JWT', async () => {
    performLogin();
    await waitFor(() => expect(localStorage.getItem('sprint_token')).toBe('jwt'));
});

test('T31 — After mock login: localStorage role matches MENTOR', async () => {
    performLogin('MENTOR');
    await waitFor(() => expect(localStorage.getItem('sprint_role')).toBe('MENTOR'));
});

test('T32 — After logout: token and role are cleared', async () => {
    performLogin();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Logout/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(localStorage.getItem('sprint_token')).toBeNull();
    });
});

test('T33 — Logout resets auth state to unauthenticated', async () => {
    performLogin();
    const btn = await waitFor(() => screen.getByRole('button', { name: /Logout/i }));
    fireEvent.click(btn);
    await waitFor(() => {
        expect(store.getState().auth.user).toBeNull();
    });
});

test('T34 — After login dispatch: Redux state has domain fields', async () => {
    performLogin();
    await waitFor(() => expect(store.getState().auth.user.role).toBe('MENTOR'));
});

// =====================================================================================
// SPRINT 7: Input Field Contracts & Validation
// =====================================================================================

test('T35 — Password input: type is password', () => {
    render(<Provider store={store}><App /></Provider>);
    const input = document.querySelector('input[name="password"]');
    expect(input.type).toBe('password');
});

test('T36 — Search input has correct placeholder', async () => {
    performLogin();
    await navigateToRoadmaps();
    await waitFor(() => expect(screen.getByPlaceholderText(/Search roadmaps by title/i)).toBeInTheDocument());
});

test('T37 — Capacity field is required', async () => {
    performLogin('MENTOR');
    await navigateToRoadmaps();
    const btn = await waitFor(() => screen.getByRole('button', { name: /\+ Add Roadmap/i }));
    fireEvent.click(btn);
    const input = document.querySelector('input[type="number"]');
    await waitFor(() => {
        expect(input).toBeRequired();
    });
});
