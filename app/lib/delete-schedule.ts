"use server";

export async function deleteSchedule(scheduleId: string): Promise<void> {
  try {
    console.log("---------deleteSchedule---------");
    console.log("scheduleId: ", scheduleId);
    
    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_scheduler?schedule_id=' + scheduleId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'DELETE', // Explicitly mentioning the method for CORS preflight
        'Access-Control-Request-Headers': 'Content-Type' // Explicitly mentioning headers for CORS preflight
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete Schedule');
    }

    console.log("Schedule deleted successfully");

  } catch (error) {
    console.error("Error deleting your Schedule: ", error);
  }
}