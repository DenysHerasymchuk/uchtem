// TODO: replace with Uchtem's real Formspree form ID before launch.
// Sign up at https://formspree.io, create a form, and swap the id below.
const FORMSPREE_FORM_ID = "your-form-id";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export interface ContactSubmission {
    name: string;
    email: string;
    company: string;
    companySize: string;
    message: string;
}

export async function submitContactForm(data: ContactSubmission): Promise<void> {
    const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Submission failed");
    }
}
