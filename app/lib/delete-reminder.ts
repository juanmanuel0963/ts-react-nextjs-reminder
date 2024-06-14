"use server";

export async function deleteReminder(id: number): Promise<void> {
  try {
    console.log("---------deleteReminder---------");
    console.log("id: ", id);

    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_reminders?id=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'DELETE', // Explicitly mentioning the method for CORS preflight
        'Access-Control-Request-Headers': 'Content-Type' // Explicitly mentioning headers for CORS preflight
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete Reminder');
    }

    console.log("Reminder deleted successfully");

  } catch (error) {
    console.error("Error deleting your Reminder:", error);
  }
}
