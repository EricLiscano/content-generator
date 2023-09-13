import GeneratorParams from '../Structures/GeneratorParams';
import OpenAIService from './OpenAIService';

export default class ImageGeneratorService {
  public async generateImage(params: GeneratorParams): Promise<any> {
    return await OpenAIService.getInstance().images.generate({ prompt: params.aiPrompt });
  }
}
