/**
 * Simplified 3PL IRT Scoring Engine
 * P(theta) = c + (1-c) * (1 / (1 + exp(-a * (theta - b))))
 */

export interface IRTItemParams {
  a: number; // Discrimination
  b: number; // Difficulty
  c: number; // Guessing
}

export function calculateTheta(
  answers: boolean[], // true if correct, false if incorrect
  params: IRTItemParams[],
  iterations: number = 20
): number {
  let theta = 0; // Initial estimate (average ability)
  
  for (let i = 0; i < iterations; i++) {
    let numerator = 0;
    let denominator = 0;
    
    for (let j = 0; j < answers.length; j++) {
      const { a, b, c } = params[j];
      const p = c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
      const q = 1 - p;
      
      // Derivative of P with respect to theta
      const pPrime = (1 - c) * a * Math.exp(-a * (theta - b)) / Math.pow(1 + Math.exp(-a * (theta - b)), 2);
      
      const response = answers[j] ? 1 : 0;
      
      numerator += (pPrime * (response - p)) / (p * q);
      denominator += Math.pow(pPrime, 2) / (p * q);
    }
    
    // Newton-Raphson update
    if (denominator !== 0) {
      const delta = numerator / denominator;
      // Dampen the update to avoid oscillation
      theta += Math.max(-0.5, Math.min(0.5, delta));
    }
  }
  
  // Scale theta (usually -3 to 3) to 0-100 for display
  // Using a simple linear transformation: (theta + 3) / 6 * 100
  const scaledScore = ((theta + 3) / 6) * 100;
  return Math.max(0, Math.min(100, scaledScore));
}
