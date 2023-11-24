export const useTypingEffect = (updateFunction: any, typingSpeed = 100) => {
  const typeText = async (fieldName: any, text: any) => {
    for (let i = 0; i <= text.length; i++) {
      const partialText = text.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
      updateFunction(fieldName, partialText);
    }
  };

  return typeText;
};