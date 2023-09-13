export default class GeneratorParams {
  public action: string = 'createAIImages';
  public aiPrompt: string;
  public returnUrl: string = '/';
  public searchType: string = 'aiPrompt';
  public numberPerPage: number = 12;
  public currentPage: number = 1;

  constructor(aiPrompt: string) {
    this.aiPrompt = aiPrompt;
  }
}
