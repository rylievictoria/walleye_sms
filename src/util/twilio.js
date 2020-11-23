import { apiRequest } from "./util";

export async function sendSms(number, message) {
    // Create a twilio session
    return await apiRequest("twilio-send-sms", "POST", {
        to: String(number),  // Need someway to enforce number format
        message: message
    });
}