export function sanitizeResponse(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<think>[\s\S]*$/gi, "")
    .replace(/<\/think>/gi, "")
    .replace(/思考过程[:：][\s\S]*/gi, "")
    .replace(/推理过程[:：][\s\S]*/gi, "")
    .replace(/分析过程[:：][\s\S]*/gi, "")
    .trim();
}
