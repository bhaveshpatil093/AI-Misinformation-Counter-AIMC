
export type VerificationStatus = 'verified' | 'false' | 'mixed';

export interface FactCheck {
  id: string;
  claim: string;
  source: string;
  date: string;
  status: VerificationStatus;
  explanation: string;
  summary: string;
  category: string;
  references: string[];
}

export const factChecks: FactCheck[] = [
  {
    id: '1',
    claim: "AI can perfectly replicate human creativity and consciousness",
    source: "Social Media",
    date: "2023-12-15",
    status: 'false',
    explanation: "Current AI models can generate content that appears creative, but they lack true consciousness, understanding, or authentic creative intent. They operate by pattern recognition and statistical analysis of existing human works, without genuine understanding or emotional experiences that drive human creativity.",
    summary: "AI systems can generate impressive content but lack true consciousness or creativity.",
    category: "Technology",
    references: [
      "https://www.scientificamerican.com/article/no-ai-has-not-attained-consciousness/",
      "https://stanford.edu/~jduchi/papers/limits-of-ai.pdf"
    ]
  },
  {
    id: '2',
    claim: "AI language models never make factual errors",
    source: "News Article",
    date: "2023-11-05",
    status: 'false',
    explanation: "AI language models frequently produce 'hallucinations' - confidently stated but fabricated information. They are statistical prediction systems that generate plausible-sounding text based on training data, but can invent citations, misstate facts, or create entirely fictional answers when uncertain.",
    summary: "AI language models frequently produce factual errors and fabricate information.",
    category: "Technology",
    references: [
      "https://arxiv.org/abs/2202.03629",
      "https://www.technologyreview.com/2023/02/14/1068498/how-chatgpt-actually-works/"
    ]
  },
  {
    id: '3',
    claim: "AI-generated images can be used as legal evidence",
    source: "Online Forum",
    date: "2023-10-22",
    status: 'mixed',
    explanation: "While AI-generated images are increasingly realistic, they are generally not admissible as primary evidence in most legal jurisdictions. However, the situation is evolving. Some courts may accept them for illustrative purposes with proper authentication and disclosure of their AI-generated nature, but they cannot typically replace authentic photographic evidence.",
    summary: "AI images have limited legal value, mainly for illustration rather than evidence.",
    category: "Legal",
    references: [
      "https://www.law.cornell.edu/rules/fre/rule_1001",
      "https://www.americanbar.org/groups/litigation/publications/litigation-news/featured-articles/2023/ai-generated-evidence-courts/"
    ]
  },
  {
    id: '4',
    claim: "AI systems can predict stock market movements with high accuracy",
    source: "Investment Blog",
    date: "2023-09-18",
    status: 'false',
    explanation: "While AI systems are used in financial analysis, no system can consistently predict stock market movements with high accuracy. Markets are influenced by countless variables including unpredictable human behavior, global events, and policy changes. Studies show that claimed high-accuracy predictions typically don't hold up in real-world testing over time.",
    summary: "No AI system can consistently predict stock market movements with high accuracy.",
    category: "Finance",
    references: [
      "https://www.bloomberg.com/opinion/articles/2023-01-27/ai-still-can-t-beat-the-market",
      "https://jfin-swufe.springeropen.com/articles/10.1186/s40854-020-00187-0"
    ]
  },
  {
    id: '5',
    claim: "AI researchers have achieved artificial general intelligence (AGI)",
    source: "Technology Magazine",
    date: "2023-08-30",
    status: 'false',
    explanation: "Artificial General Intelligence (AGI) - human-level intelligence that can perform any intellectual task a human can - has not been achieved. Current AI systems are 'narrow AI' focused on specific tasks. While impressive advances have been made in certain domains like language processing and image recognition, no system possesses the generalized problem-solving ability, transfer learning, common sense reasoning, and adaptability that defines AGI.",
    summary: "Artificial General Intelligence has not been achieved despite advances in narrow AI applications.",
    category: "Technology",
    references: [
      "https://www.nature.com/articles/s41586-023-06792-0",
      "https://hai.stanford.edu/news/agi-hype-and-reality"
    ]
  },
  {
    id: '6',
    claim: "AI facial recognition is completely accurate across all demographics",
    source: "Tech Company Statement",
    date: "2023-12-05",
    status: 'false',
    explanation: "Studies consistently show that facial recognition AI systems have varying accuracy rates across different demographic groups. Many commercial systems demonstrate higher error rates for women, people with darker skin tones, and younger or older individuals. These disparities occur due to biases in training data, algorithmic design choices, and inadequate testing across diverse populations.",
    summary: "Facial recognition systems show significant accuracy disparities across demographic groups.",
    category: "Technology",
    references: [
      "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
      "https://www.aclu.org/news/privacy-technology/how-artificial-intelligence-can-deepen-racial-and-economic-inequities"
    ]
  },
  {
    id: '7',
    claim: "OpenAI's GPT-4 passed the bar exam with scores in the top 10% of test takers",
    source: "Technology News",
    date: "2023-03-14",
    status: 'verified',
    explanation: "According to a paper published by OpenAI, GPT-4 performed at the 90th percentile on a simulated bar exam, significantly outperforming the earlier GPT-3.5 model which scored around the 10th percentile. This claim has been verified through multiple sources including Stanford University researchers who confirmed similar performance levels in their independent testing.",
    summary: "GPT-4 did score in the top 10% on bar exam simulations in verified testing.",
    category: "Technology",
    references: [
      "https://openai.com/research/gpt-4",
      "https://law.stanford.edu/2023/07/14/stanford-researchers-find-that-gpt-4-complements-knowledge-workers-including-lawyers/"
    ]
  }
];
