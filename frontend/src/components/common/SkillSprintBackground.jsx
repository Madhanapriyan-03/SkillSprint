import React from 'react';
import studyWorkspaceImg from '../../assets/study_workspace.jpg';

/**
 * SkillSprint Study Theme Background System
 * Elegant, subtly-softened study aesthetic:
 * 1. High-resolution study workspace backdrop (Books, notebook, study lamp, laptop)
 * 2. Gentle, subtle blur (3px) that keeps books and desk clearly recognizable while softening harsh contrast
 * 3. Soft depth vignette framing the viewport
 */
const SkillSprintBackground = () => {
  return (
    <div
      className="skillsprint-bg-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Layer 0: High-Resolution Study Workspace with Gentle Subtle Blur */}
      <div
        className="study-bg-image-wrapper"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          backgroundImage: `url(${studyWorkspaceImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          opacity: 0.96,
          filter: 'blur(3px) saturate(1.12) brightness(0.96)',
          transform: 'scale(1.025)'
        }}
      />

      {/* Layer 1: Soft depth vignette framing the edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(15, 23, 42, 0.03) 0%, rgba(11, 19, 43, 0.22) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default SkillSprintBackground;
