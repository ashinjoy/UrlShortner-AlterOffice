import { IAnalyticsRepository } from "../interface/analyticsRepository";

export class AnalyticsService {
  analyticsRepository: IAnalyticsRepository;
  constructor(analyticsRepository: IAnalyticsRepository) {
    this.analyticsRepository = analyticsRepository;
    console.log(analyticsRepository)
  }
  async analyticsServiceOfSpecificUrl(alias: string) {
    try {
    const data =  await this.analyticsRepository.getAnalyticsOfSpecificUrl(alias)
    return data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async analyticsServiceOfSpecificTopic(topic:string){
    try {
        const data = this.analyticsRepository.getAnalyticsOfSpecificTopic(topic)
        return data
    } catch (error) {
        console.error(error);
        throw error
    }

  }
  async overallAnalytics(){
    try {
        const data = this.analyticsRepository.getOverallAnalytics()
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
  }
  
}
