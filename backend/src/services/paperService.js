const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');

class ParserService {
  async extractText(buffer, mimeType) {
    if (mimeType === 'application/pdf') {
      const data = await pdfParse(buffer);
      return data.text;
    } else if (mimeType.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
      return text;
    }
    throw new Error('Unsupported file type');
  }

  parseACORDForm(text) {
    const result = {};
    const patterns = {
      policyNumber: /POLICY\s*NUMBER\s*[:|]\s*([A-Z0-9\-]+)/i,
      insuredName: /NAMED\s*INSURED\s*[:|]\s*([^\n]+)/i,
      insurerName: /INSURANCE\s*COMPANY\s*[:|]\s*([^\n]+)/i,
      effectiveDate: /EFFECTIVE\s*DATE\s*[:|]\s*([\d\/\-]+)/i,
      expiryDate: /EXPIRATION\s*DATE\s*[:|]\s*([\d\/\-]+)/i,
      coverageLimits: /LIMITS\s*[:|]\s*\$?([\d,]+)/i
    };
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      result[key] = match ? match[1].trim() : null;
    }
    return result;
  }

  async processCOI(buffer, mimeType) {
    const rawText = await this.extractText(buffer, mimeType);
    const parsed = this.parseACORDForm(rawText);
    return { rawText, parsed };
  }
}

module.exports = new ParserService();
