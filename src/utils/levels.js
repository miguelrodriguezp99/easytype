/*
 * @returns {Array} array with the experience required for each level
 */
export const generateLevelsExperience = () => {
  const levels = [];
  let currentExperience = 250; // Experiencia inicial para el nivel 1

  for (let level = 1; level <= 100; level++) {
    levels.push(currentExperience);
    currentExperience = Math.round(currentExperience * 1.1); // Incrementa un 10% para el siguiente nivel
  }

  return levels;
};
