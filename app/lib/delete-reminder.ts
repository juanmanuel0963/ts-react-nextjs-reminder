"use server";

export async function deleteReminder(id: number): Promise<void> {
  try {
    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_reminders?id=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'DELETE', // Explicitly mentioning the method for CORS preflight
        'Access-Control-Request-Headers': 'Content-Type' // Explicitly mentioning headers for CORS preflight
      }
    });

    console.log("DELETE fetch end");
    console.log("Response:", response);
    console.log("Response.ok:", response.ok);

    if (!response.ok) {
      throw new Error('Failed to delete reminder');
    }

  } catch (error) {
    console.error("Error deleting your reminder:", error);

  }
}
