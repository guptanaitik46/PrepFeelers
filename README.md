🧠 PrepFeelers – CBSE Class 10th PYQs Test Generator using AI and get Detailed Feedback and analysis using AI

<img width="1722" height="1478" alt="image" src="https://github.com/user-attachments/assets/4768fcc7-ae05-4066-ba3d-15e75aed0fcc" />


📌 One-stop solution to practice, analyze, and ace your CBSE Class 10th Board Exams with confidence!


📚 What is PrepFeelers?

PrepFeelers is a full-stack React app that generates custom CBSE Class 10th PYQ-based tests using Google Gemini AI. It’s designed to simulate the real board exam experience — from timed test papers to chapter-wise feedback and smart performance analysis with secured login/logout.


🌟 Key Features

📝 Test Configuration

🔐 Secure login system (Google, phone, email) via Clerk – test progress is user-specific

✅ Select subjects: Maths, Physics, Chemistry, Biology

✅ Choose chapters from syllabus (optional filtering)

✅ Select number of questions (1 to 30)

✅ Pick marks per question: 1–5 or Mixed

✅ Select duration: 15 mins to 3 hours ⏱️



🔄 Seamless Login / Logout

👤 Personalized test sessions and feedback

🧾 Feedback PDFs are tagged to the user

🔓 Quick login/logout from the navbar

📄 Real-Time Test Page

⏳ Live Timer Display at the top of test page

⏰ 5-minute remaining warning

🛑 Auto-submit test if time runs out

💡 Clean, focused layout for a distraction-free experience

🗂️ All questions clearly separated with:

Subject

Chapter

Marks

Year

Question Type



⚡ Smart AI-Powered Question Generation

🤖 Powered by Gemini AI 

📚 Generates authentic-style CBSE Previous Year questions

🎯 AI picks questions based on:

Chapters

Subject

Marks per Question

Year 



🛠️ Fallback to demo/sample mode if AI is unavailable

💡 No need to do anything — just start practicing.

📊 Instant & Detailed Feedback & Performance Analysis
Once the test is submitted:

✅ See which questions you got correct, incorrect, or unanswered

📌 View the correct answer for each question

📈 Get percentage, marks obtained, and grade (A+ to F)

🔍 Subject-wise & Chapter-wise breakdown:

Number of questions

Accuracy

Marks obtained

Total marks

Performance summary


📥 Downloadable PDF Report to save your performance and use it later for improvement
🧾 Auto-generated PDF feedback report with:

All your answers (correct/wrong/unanswered)

Official correct answers

Chapter-wise strengths & weaknesses

Marks, percentage, and grade

🖨️ One-click Print or Save PDF

🎓 Perfect for offline revision or sharing with teachers/mentors



💡 Why PrepFeelers?
“PYQs are the most important part of board exam preparation. But what if students could practice them with smart filters, detailed feedback, and printable reports? That’s PrepFeelers.”

PrepFeelers isn’t just a test generator — it’s a personal board exam simulator, built for real success:

🚀 Helps you identify weak areas

🔁 Encourages targeted revision

🎯 Mimics real exam pressure with timer and auto-submit

🧠 Uses AI to ensure relevant, high-quality questions

📸 Screenshots
(Add your own screenshots here for homepage, test view, feedback, etc.)

🛠️ Tech Stack
Frontend: React + TypeScript + Vite

Styling: Tailwind CSS

AI Integration: Gemini 1.5 Flash via @google/generative-ai

PDF Export: jsPDF + html2canvas

Deployment: Netlify

Auth : Clerk (as needed)

🚀 Local Setup Instructions
bash
Copy
Edit
# Clone the repo
git clone https://github.com/guptanaitik46/PrepFeelers.git

cd PrepFeelers

set up your .env file.

# Install dependencies
npm install

# Start the development server
npm run dev


📜 License
This project is licensed under the MIT License.

📬 Contact
Made with ❤️ by Naitik Gupta

📧 Reach out for feedback, collaboration, or queries.
