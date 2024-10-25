import { Task } from "../interfaces/task";

class TaskService {
    private apiUrl = 'https://mpce87c1906c42d8e639.free.beeceptor.com/';
  
    async getTasks(): Promise<Task[]> {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        return tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
    }
  }
  
  export default TaskService;