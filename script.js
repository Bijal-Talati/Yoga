// Sample data structure: add all asanas as needed
const asanas = {
  "Standing": [
    {
      id: "tadasana",
      name: "Tadasana (Mountain Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400">
        <!-- simple figure standing -->
        <circle cx="100" cy="40" r="20" fill="#f2c9a0"/>
        <rect x="95" y="60" width="10" height="200" fill="#88c0d0"/>
      </svg>`,
      procedure: "Stand tall with feet together, arms at side, weight evenly distributed, breathe smoothly.",
      benefits: "Improves posture, strengthens thighs and calves, increases awareness.",
      caution: "Avoid if you have low blood pressure or dizziness.",
      ayurveda: "Balances Vata and Kapha doshas, grounding for air-types.",
      therapy: "Helps relieve sciatica and mild back pain."
    }
  ],
  "Seated": [
    {
      id: "dandasana",
      name: "Dandasana (Staff Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400">
        <circle cx="100" cy="40" r="20" fill="#f2c9a0"/>
        <rect x="95" y="60" width="10" height="200" fill="#c0d088"/>
      </svg>`,
      procedure: "Sit with legs straight, spine erect, arms beside hips, engage core.",
      benefits: "Strengthens back muscles, improves posture and digestion.",
      caution: "Avoid if you have hamstring injuries.",
      ayurveda: "Enhances Pitta balance, promotes heat regulation.",
      therapy: "Reduces abdominal fat, relieves backache."
    }
  ]
  // … add more asanas in categories
};
