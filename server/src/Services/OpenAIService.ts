import { OpenAI } from 'openai';
import { openAICredentials } from '../../credentials/credentials';

export default class OpenAIService {
  private static openai: OpenAI;

  public static getInstance(): OpenAI {
    if (!this.openai) {
      this.openai = new OpenAI({ organization: openAICredentials.organization, apiKey: openAICredentials.apiKey });
    }

    return this.openai;
  }
}
