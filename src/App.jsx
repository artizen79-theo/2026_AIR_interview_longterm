import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Section from './components/Section';
import Input from './components/Input';
import Textarea from './components/Textarea';
import Counter from './components/Counter';
import RadioGroup from './components/RadioGroup';
import Button from './components/Button';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    activityReport: '',
    nokisakiCount: 0,
    artistMtgCount: 0,
    onAirCount: 0,
    patrolCount: 0,
    cleanupCount: 0,
    otherInteraction: '',
    supportSatisfaction: '', // '1', '2', '3', '4', '5'
    supportGoodPoints: '',
    supportImprovements: '',
    wishToContinue: '',
    wishToMove: '',
    desiredStudio: '',
    moveReason: '',
    requests: '',
    goals: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let interval;
    if (isSubmitted) {
      // Immediate firework
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#be9949', '#fcd34d', '#ffffff']
      });

      // Continuous fireworks
      interval = setInterval(() => {
        const randomInRange = (min, max) => Math.random() * (max - min) + min;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
          colors: ['#be9949', '#fcd34d', '#ffffff'],
          ticks: 200,
          gravity: 0.8,
          startVelocity: 30,
        });
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
          colors: ['#be9949', '#fcd34d', '#ffffff'],
          ticks: 200,
          gravity: 0.8,
          startVelocity: 30,
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_AfBhwgxJm8wCLtAHpI7sgDgGPU3FIW7I795aHsa6UOcv4R8TetbNLjrVRYbBUxE/exec';

    try {
      // Using 'text/plain' to avoid CORS preflight issues while keeping no-cors
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。 / An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="app-container success-view">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="success-card"
        >
          <div className="success-icon">✨ 🗓️ ✨</div>
          <h2 className="success-title">ありがとうございます！</h2>
          <p className="success-subtitle">Thank you for your response.</p>
          <p className="success-desc">
            回答を記録しました。<br />
            続いて、面談スケジュールのご予約をお願いいたします。<br />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Next, please book your interview schedule.
            </span>
          </p>
          <Button onClick={() => window.open('https://script.google.com/macros/s/AKfycby3dfBCr-OrV3ndPCCej2n_3gTUSDwpHZKdPGVOmeVwEwE6mkA7TzR4S242PDOEhMg/exec', '_blank')}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🗓️</span>
              <span>面談スケジュール予約 / Interview Schedule Booking</span>
            </span>
          </Button>
          <div style={{ marginTop: '2rem' }}>
            <button
              className="text-button"
              onClick={() => window.location.reload()}
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}
            >
              フォームに戻る / Back to Form
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />

      <form onSubmit={handleSubmit} className="form-container">

        {/* Basic Info */}
        <Section title="基本情報" subTitle="Basic Information" delay={0.1}>
          <Input
            label="1. 氏名"
            subLabel="Name"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="例: 黄金 太郎 / Taro Kogane"
          />
          <Input
            label="2. 現在利用しているスタジオ"
            subLabel="Your studio name"
            id="studioName"
            value={formData.studioName}
            onChange={(e) => handleChange('studioName', e.target.value)}
            required
            placeholder="例: Studio A"
          />
        </Section>

        <Section title="Q1. 活動実績" subTitle="Activity Report" delay={0.2}>
          <Textarea
            label="黄金町 AIR 2025 参加中の自身の活動実績について教えてください。"
            subLabel="What activities did you do last year (2025)? (e.g. Participation in exhibitions, events, etc.)"
            id="activityReport"
            value={formData.activityReport}
            onChange={(e) => handleChange('activityReport', e.target.value)}
            required
          />
        </Section>

        <Section title="Q2. 地域との活動" subTitle="Community Interaction" delay={0.3}>
          <p className="section-desc">
            黄金町 AIR 2025 参加中の黄金町の地域との関わりについて教えてください。<br />
            How did you interact with this region during Koganecho AIR 2025?
          </p>

          <div className="counters-grid">
            <Counter
              label="のきさきアートフェア / Nokisaki Art Fair"
              value={formData.nokisakiCount}
              onChange={(val) => handleChange('nokisakiCount', val)}
            />
            <Counter
              label="アーティスト連絡会議 / Artist's MTG"
              value={formData.artistMtgCount}
              onChange={(val) => handleChange('artistMtgCount', val)}
            />
            <Counter
              label="ON AIR"
              value={formData.onAirCount}
              onChange={(val) => handleChange('onAirCount', val)}
            />
            <Counter
              label="防犯パトロール / Crime prevention patrol"
              value={formData.patrolCount}
              onChange={(val) => handleChange('patrolCount', val)}
            />
            <Counter
              label="初黄・日ノ出町環境浄化推進協議会 定例会 / Regular meeting of the Environmental Cleanup Initiative Committee"
              value={formData.cleanupCount}
              onChange={(val) => handleChange('cleanupCount', val)}
            />
          </div>

          <Textarea
            label="その他 (地域イベントへの参加など)"
            subLabel="Other participation experience (if any)"
            id="otherInteraction"
            value={formData.otherInteraction}
            onChange={(e) => handleChange('otherInteraction', e.target.value)}
          />
        </Section>

        {/* New Q3 */}
        <Section title="Q3. アーティスト支援について" subTitle="Support for Artists" delay={0.35}>
          <RadioGroup
            label="黄金町 AIRのアーティスト支援は充実していますか？"
            subLabel="Are you satisfied with the support for artists in the Koganecho AIR program?"
            name="supportSatisfaction"
            options={[
              { label: '1. よくない / Not satisfied (0%)', value: '1. よくない / Not satisfied (0%)' },
              { label: '2. あまり良くない / Somewhat dissatisfied (25%)', value: '2. あまり良くない / Somewhat dissatisfied (25%)' },
              { label: '3. 普通 / Neutral (50%)', value: '3. 普通 / Neutral (50%)' },
              { label: '4. よい / Satisfied (75%)', value: '4. よい / Satisfied (75%)' },
              { label: '5. とてもよい / Very satisfied (90%)', value: '5. とてもよい / Very satisfied (90%)' }
            ]}
            value={formData.supportSatisfaction}
            onChange={(val) => handleChange('supportSatisfaction', val)}
          />
          <div className="mt-6">
            <Textarea
              label="具体的にあれば教えてください - よいところ"
              subLabel="Please give us more details - What was good"
              id="supportGoodPoints"
              value={formData.supportGoodPoints}
              onChange={(e) => handleChange('supportGoodPoints', e.target.value)}
            />
            <Textarea
              label="改善してほしいところ"
              subLabel="What could be improved"
              id="supportImprovements"
              value={formData.supportImprovements}
              onChange={(e) => handleChange('supportImprovements', e.target.value)}
            />
          </div>
        </Section>

        {/* Renumbered Q4 */}
        <Section title="Q4. 継続参加について" subTitle="Future Plans" delay={0.4}>
          <RadioGroup
            label="黄金町 AIR 2026 への継続参加を希望しますか?"
            subLabel="Do you wish to continue participating in Koganecho AIR 2026?"
            name="wishToContinue"
            options={[
              { label: 'はい / Yes', value: 'はい / Yes' },
              { label: 'いいえ / No', value: 'いいえ / No' }
            ]}
            value={formData.wishToContinue}
            onChange={(val) => handleChange('wishToContinue', val)}
          />

          <AnimatePresence>
            {formData.wishToContinue === 'はい / Yes' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="conditional-fields"
              >
                <div className="subsection-divider"></div>

                <RadioGroup
                  label="Q4-1. スタジオの移動を希望していますか?"
                  subLabel="Do you want to change your studio?"
                  name="wishToMove"
                  options={[
                    { label: 'はい / Yes', value: 'はい / Yes' },
                    { label: 'いいえ / No', value: 'いいえ / No' }
                  ]}
                  value={formData.wishToMove}
                  onChange={(val) => handleChange('wishToMove', val)}
                />

                {formData.wishToMove === 'はい / Yes' && (
                  <>
                    <Input
                      label="希望するスタジオ"
                      subLabel="Desired studio"
                      id="desiredStudio"
                      value={formData.desiredStudio}
                      onChange={(e) => handleChange('desiredStudio', e.target.value)}
                      placeholder="例: Studio A"
                    />
                    <Textarea
                      label="移動したい理由や希望があればご記入ください。"
                      subLabel="Reasons and wishes for moving"
                      id="moveReason"
                      value={formData.moveReason}
                      onChange={(e) => handleChange('moveReason', e.target.value)}
                      placeholder="理由や希望があればご記入ください / Reasons and wishes"
                    />
                  </>
                )}

                <Textarea
                  label="Q4-2. 黄金町 AIR プログラムに対してご要望があればご記入ください。"
                  subLabel="If you have any requests for the Koganecho AIR program, please let us know."
                  id="requests"
                  value={formData.requests}
                  onChange={(e) => handleChange('requests', e.target.value)}
                />

                <Textarea
                  label="Q4-3. 今後、黄金町 AIR への参加を継続する中での活動目標や計画について教えてください。"
                  subLabel="Do you have any future activity goals or plans? (Include community involvement)"
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleChange('goals', e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        <div className="submit-area">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '送信中... / Sending...' : '送信する / Submit'}
          </Button>
        </div>

      </form>

      <footer className="app-footer">
        © 2026 Koganecho Area Management Center
      </footer>
    </div>
  );
}

export default App;
