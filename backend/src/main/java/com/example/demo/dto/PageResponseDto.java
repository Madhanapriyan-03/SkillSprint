package com.example.demo.dto;

import java.util.List;

public class PageResponseDto<T> {
    private List<T> content;
    private int currentPage;
    private long totalElements;
    private int totalPages;

    public PageResponseDto() {}

    public PageResponseDto(List<T> content, int currentPage, long totalElements, int totalPages) {
        this.content = content;
        this.currentPage = currentPage;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<T> getContent() { 
        return content; 
    }
    public void setContent(List<T> content) { 
        this.content = content; 
    }

    public int getCurrentPage() { 
        return currentPage; 
    }
    public void setCurrentPage(int currentPage) { 
        this.currentPage = currentPage; 
    }

    public long getTotalElements() { 
        return totalElements; 
    }
    public void setTotalElements(long totalElements) { 
        this.totalElements = totalElements; 
    }

    public int getTotalPages() { 
        return totalPages; 
    }
    public void setTotalPages(int totalPages) { 
        this.totalPages = totalPages; 
    }
}
