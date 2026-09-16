import React from 'react';

/**
 * SkillVelocityChart
 * Interactive SVG breakdown of graded evaluation scores & learning velocity
 */
const SkillVelocityChart = ({ submissions = [] }) => {
  const scoredSubmissions = submissions.filter((s) => s.score !== null && s.score !== undefined);

  // Group scores into standard competency tiers
  const tierMastery = scoredSubmissions.filter((s) => Number(s.score) >= 90).length;
  const tierProficient = scoredSubmissions.filter((s) => Number(s.score) >= 75 && Number(s.score) < 90).length;
  const tierPassing = scoredSubmissions.filter((s) => Number(s.score) >= 60 && Number(s.score) < 75).length;
  const tierReview = scoredSubmissions.filter((s) => Number(s.score) < 60).length;

  const total = scoredSubmissions.length;

  const getPercentage = (count) => (total > 0 ? Math.round((count / total) * 100) : 0);

  return (
    <div className="card" style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Grade & Competency Distribution</h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Evaluated deliverables by mastery tier
            </p>
          </div>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '0.75rem',
              fontWeight: '800'
            }}
          >
            {total} Graded
          </span>
        </div>

        {total === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>📈</span>
            No scored submissions yet. Scores will populate here after mentor evaluation.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
            {/* Tier 1: Mastery (90-100) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#059669' }}>🌟 Mastery (90–100%)</span>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                  {tierMastery} ({getPercentage(tierMastery)}%)
                </span>
              </div>
              <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${getPercentage(tierMastery)}%`, height: '100%', background: '#10b981', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Tier 2: Proficient (75-89) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#2563eb' }}>✓ Proficient (75–89%)</span>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                  {tierProficient} ({getPercentage(tierProficient)}%)
                </span>
              </div>
              <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${getPercentage(tierProficient)}%`, height: '100%', background: '#3b82f6', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Tier 3: Passing (60-74) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#d97706' }}>⚡ Passing (60–74%)</span>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                  {tierPassing} ({getPercentage(tierPassing)}%)
                </span>
              </div>
              <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${getPercentage(tierPassing)}%`, height: '100%', background: '#f59e0b', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Tier 4: Needs Revision (<60) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#dc2626' }}>🔄 Needs Revision (&lt;60%)</span>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>
                  {tierReview} ({getPercentage(tierReview)}%)
                </span>
              </div>
              <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${getPercentage(tierReview)}%`, height: '100%', background: '#ef4444', borderRadius: '999px' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillVelocityChart;
