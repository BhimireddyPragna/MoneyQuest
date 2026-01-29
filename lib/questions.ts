export interface Question {
  id: string
  question: string
  questionHi: string
  options: string[]
  optionsHi: string[]
  correctAnswer: number
  category: "maths" | "aptitude" | "gk" | "logical"
  difficulty: "easy" | "medium" | "hard"
}

export const questions: Question[] = [
  // ==================== MATHS ====================
  // Maths - Easy
  { id: "math-e-1", question: "What is 25% of 400?", questionHi: "400 का 25% क्या है?", options: ["80", "100", "120", "150"], optionsHi: ["80", "100", "120", "150"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-2", question: "If you have ₹500 and spend ₹175, how much is left?", questionHi: "अगर आपके पास ₹500 हैं और ₹175 खर्च करते हैं, तो कितने बचे?", options: ["₹225", "₹325", "₹375", "₹425"], optionsHi: ["₹225", "₹325", "₹375", "₹425"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-3", question: "What is 12 × 15?", questionHi: "12 × 15 कितना है?", options: ["160", "180", "200", "220"], optionsHi: ["160", "180", "200", "220"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-4", question: "What is the square root of 144?", questionHi: "144 का वर्गमूल क्या है?", options: ["10", "12", "14", "16"], optionsHi: ["10", "12", "14", "16"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-5", question: "If a book costs ₹250 and you get 20% off, what do you pay?", questionHi: "अगर किताब ₹250 की है और 20% छूट मिले, तो कितना देंगे?", options: ["₹180", "₹200", "₹220", "₹230"], optionsHi: ["₹180", "₹200", "₹220", "₹230"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-6", question: "What is 48 ÷ 6?", questionHi: "48 ÷ 6 कितना है?", options: ["6", "8", "9", "10"], optionsHi: ["6", "8", "9", "10"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-7", question: "What is 15% of 200?", questionHi: "200 का 15% क्या है?", options: ["20", "30", "35", "40"], optionsHi: ["20", "30", "35", "40"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  { id: "math-e-8", question: "What is 7²?", questionHi: "7² कितना है?", options: ["42", "49", "56", "64"], optionsHi: ["42", "49", "56", "64"], correctAnswer: 1, category: "maths", difficulty: "easy" },
  
  // Maths - Medium
  { id: "math-m-1", question: "A stock increases from ₹800 to ₹1000. What is the percentage gain?", questionHi: "स्टॉक ₹800 से ₹1000 हो जाता है। प्रतिशत लाभ क्या है?", options: ["20%", "25%", "30%", "35%"], optionsHi: ["20%", "25%", "30%", "35%"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-2", question: "Calculate: 15² - 12²", questionHi: "गणना करें: 15² - 12²", options: ["61", "81", "91", "101"], optionsHi: ["61", "81", "91", "101"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-3", question: "If you invest ₹5000 at 10% simple interest, what's the interest after 3 years?", questionHi: "₹5000 को 10% साधारण ब्याज पर 3 साल में कितना ब्याज?", options: ["₹1000", "₹1500", "₹2000", "₹2500"], optionsHi: ["₹1000", "₹1500", "₹2000", "₹2500"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-4", question: "What is 3/4 + 2/3?", questionHi: "3/4 + 2/3 कितना है?", options: ["5/7", "17/12", "11/7", "13/12"], optionsHi: ["5/7", "17/12", "11/7", "13/12"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-5", question: "A train travels 240 km in 4 hours. What is its speed?", questionHi: "ट्रेन 4 घंटे में 240 km चलती है। गति क्या है?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], optionsHi: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-6", question: "Find the average of 45, 55, 65, 75, 85", questionHi: "45, 55, 65, 75, 85 का औसत निकालें", options: ["55", "65", "70", "75"], optionsHi: ["55", "65", "70", "75"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-7", question: "If 3x + 7 = 22, what is x?", questionHi: "अगर 3x + 7 = 22, तो x क्या है?", options: ["3", "5", "7", "9"], optionsHi: ["3", "5", "7", "9"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  { id: "math-m-8", question: "What is 0.75 as a fraction?", questionHi: "0.75 को भिन्न में बदलें", options: ["1/2", "3/4", "2/3", "4/5"], optionsHi: ["1/2", "3/4", "2/3", "4/5"], correctAnswer: 1, category: "maths", difficulty: "medium" },
  
  // Maths - Hard
  { id: "math-h-1", question: "If a stock falls 25% and then rises 33.33%, what's the net change?", questionHi: "स्टॉक 25% गिरे और फिर 33.33% बढ़े, शुद्ध बदलाव?", options: ["-8.33%", "0%", "+5%", "+8.33%"], optionsHi: ["-8.33%", "0%", "+5%", "+8.33%"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-2", question: "Calculate compound interest on ₹10,000 at 10% for 2 years", questionHi: "₹10,000 पर 10% चक्रवृद्धि ब्याज 2 साल में", options: ["₹2,000", "₹2,100", "₹2,200", "₹2,310"], optionsHi: ["₹2,000", "₹2,100", "₹2,200", "₹2,310"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-3", question: "If x² + y² = 25 and xy = 12, find x + y", questionHi: "अगर x² + y² = 25 और xy = 12, तो x + y?", options: ["5", "7", "8", "9"], optionsHi: ["5", "7", "8", "9"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-4", question: "Portfolio: 40% stocks (12% return), 60% bonds (6% return). Total return?", questionHi: "पोर्टफोलियो: 40% स्टॉक (12% रिटर्न), 60% बॉन्ड (6% रिटर्न)। कुल रिटर्न?", options: ["7.2%", "8.4%", "9%", "9.6%"], optionsHi: ["7.2%", "8.4%", "9%", "9.6%"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-5", question: "Find the LCM of 12, 18, and 24", questionHi: "12, 18 और 24 का LCM", options: ["48", "72", "96", "144"], optionsHi: ["48", "72", "96", "144"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-6", question: "If log₁₀(100) = x, what is x?", questionHi: "अगर log₁₀(100) = x, तो x क्या है?", options: ["1", "2", "10", "100"], optionsHi: ["1", "2", "10", "100"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-7", question: "What is the sum of first 20 natural numbers?", questionHi: "पहले 20 प्राकृतिक संख्याओं का योग?", options: ["190", "210", "220", "240"], optionsHi: ["190", "210", "220", "240"], correctAnswer: 1, category: "maths", difficulty: "hard" },
  { id: "math-h-8", question: "A sum becomes 3 times in 8 years at SI. Rate of interest?", questionHi: "राशि SI पर 8 साल में 3 गुना। ब्याज दर?", options: ["20%", "25%", "30%", "35%"], optionsHi: ["20%", "25%", "30%", "35%"], correctAnswer: 1, category: "maths", difficulty: "hard" },

  // ==================== APTITUDE ====================
  // Aptitude - Easy
  { id: "apt-e-1", question: "If a pen costs ₹5, how many pens can you buy with ₹45?", questionHi: "पेन ₹5 का है, ₹45 में कितने पेन?", options: ["7", "9", "10", "11"], optionsHi: ["7", "9", "10", "11"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-2", question: "A clock shows 3:15. Angle between hands?", questionHi: "घड़ी 3:15 दिखाती है। सुइयों के बीच कोण?", options: ["0°", "7.5°", "15°", "22.5°"], optionsHi: ["0°", "7.5°", "15°", "22.5°"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-3", question: "If you read 20 pages in 1 hour, how many in 3.5 hours?", questionHi: "1 घंटे में 20 पेज पढ़ें, 3.5 घंटे में कितने?", options: ["60", "70", "80", "90"], optionsHi: ["60", "70", "80", "90"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-4", question: "Next number: 5, 10, 20, 40, __?", questionHi: "अगली संख्या: 5, 10, 20, 40, __?", options: ["60", "80", "100", "120"], optionsHi: ["60", "80", "100", "120"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-5", question: "6 workers finish in 12 days. How many days for 9 workers?", questionHi: "6 मजदूर 12 दिन में। 9 मजदूर कितने दिन में?", options: ["6", "8", "10", "18"], optionsHi: ["6", "8", "10", "18"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-6", question: "If 5 apples cost ₹100, what is the cost of 8 apples?", questionHi: "5 सेब ₹100 में, 8 सेब कितने में?", options: ["₹140", "₹160", "₹180", "₹200"], optionsHi: ["₹140", "₹160", "₹180", "₹200"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-7", question: "A car travels 60 km in 1 hour. Distance in 2.5 hours?", questionHi: "कार 1 घंटे में 60 km। 2.5 घंटे में दूरी?", options: ["120 km", "150 km", "180 km", "200 km"], optionsHi: ["120 km", "150 km", "180 km", "200 km"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  { id: "apt-e-8", question: "Complete: 2, 6, 12, 20, __?", questionHi: "पूरा करें: 2, 6, 12, 20, __?", options: ["28", "30", "32", "36"], optionsHi: ["28", "30", "32", "36"], correctAnswer: 1, category: "aptitude", difficulty: "easy" },
  
  // Aptitude - Medium
  { id: "apt-m-1", question: "A does a job in 10 days, B in 15 days. Together how many days?", questionHi: "A 10 दिन में, B 15 दिन में। साथ में कितने दिन?", options: ["5", "6", "7", "8"], optionsHi: ["5", "6", "7", "8"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-2", question: "Boat: 20 km upstream in 4 hrs, downstream in 2 hrs. Stream speed?", questionHi: "नाव: 20 km धारा के विपरीत 4 घंटे, साथ 2 घंटे। धारा की गति?", options: ["2 km/h", "2.5 km/h", "3 km/h", "3.5 km/h"], optionsHi: ["2 km/h", "2.5 km/h", "3 km/h", "3.5 km/h"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-3", question: "60L mixture, milk:water = 2:1. Water to add for 1:1?", questionHi: "60L मिश्रण, दूध:पानी = 2:1। 1:1 के लिए पानी?", options: ["10L", "20L", "30L", "40L"], optionsHi: ["10L", "20L", "30L", "40L"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-4", question: "Average of 5 numbers is 20. One removed, average is 15. Which number?", questionHi: "5 संख्याओं का औसत 20। एक हटाने पर 15। कौन सी?", options: ["30", "40", "50", "60"], optionsHi: ["30", "40", "50", "60"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-5", question: "Two pipes fill tank in 12 hrs and 15 hrs. Together time?", questionHi: "दो पाइप 12 और 15 घंटे में भरते हैं। साथ में समय?", options: ["5.5 hrs", "6 hrs", "6.67 hrs", "7 hrs"], optionsHi: ["5.5 घंटे", "6 घंटे", "6.67 घंटे", "7 घंटे"], correctAnswer: 2, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-6", question: "A man rows 30 km upstream in 6 hours. If speed of stream is 2 km/h, his speed in still water?", questionHi: "आदमी 30 km धारा के विपरीत 6 घंटे में। धारा 2 km/h, शांत पानी में गति?", options: ["5 km/h", "7 km/h", "8 km/h", "10 km/h"], optionsHi: ["5 km/h", "7 km/h", "8 km/h", "10 km/h"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-7", question: "Ratio of A's age to B's age is 4:3. Sum of ages is 35. A's age?", questionHi: "A और B की आयु का अनुपात 4:3। योग 35। A की आयु?", options: ["15", "20", "25", "28"], optionsHi: ["15", "20", "25", "28"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  { id: "apt-m-8", question: "A tap fills a tank in 6 hours. Another empties it in 8 hours. Both open, time to fill?", questionHi: "टैप 6 घंटे में भरता है। दूसरा 8 घंटे में खाली। दोनों खुले, भरने में समय?", options: ["12 hrs", "24 hrs", "18 hrs", "20 hrs"], optionsHi: ["12 घंटे", "24 घंटे", "18 घंटे", "20 घंटे"], correctAnswer: 1, category: "aptitude", difficulty: "medium" },
  
  // Aptitude - Hard
  { id: "apt-h-1", question: "Train 150m passes pole in 15 sec. Time to pass 300m platform?", questionHi: "150m ट्रेन खंभा 15 सेकंड में। 300m प्लेटफॉर्म में समय?", options: ["30 sec", "45 sec", "50 sec", "60 sec"], optionsHi: ["30 सेकंड", "45 सेकंड", "50 सेकंड", "60 सेकंड"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-2", question: "Shopkeeper marks 40% above cost, gives 25% discount. Profit %?", questionHi: "दुकानदार 40% ऊपर अंकित, 25% छूट। लाभ %?", options: ["3%", "5%", "10%", "15%"], optionsHi: ["3%", "5%", "10%", "15%"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-3", question: "A:B ages = 5:4. After 10 years, 7:6. A's present age?", questionHi: "A:B आयु = 5:4। 10 साल बाद 7:6। A की वर्तमान आयु?", options: ["20 years", "25 years", "30 years", "35 years"], optionsHi: ["20 साल", "25 साल", "30 साल", "35 साल"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-4", question: "Sum doubles in 5 years at SI. How many years to become 5 times?", questionHi: "SI पर 5 साल में दोगुना। 5 गुना कितने साल में?", options: ["15 years", "20 years", "25 years", "30 years"], optionsHi: ["15 साल", "20 साल", "25 साल", "30 साल"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-5", question: "Walking at 5/6 speed, 10 min late. Usual time?", questionHi: "5/6 गति पर 10 मिनट देरी। सामान्य समय?", options: ["40 min", "50 min", "60 min", "70 min"], optionsHi: ["40 मिनट", "50 मिनट", "60 मिनट", "70 मिनट"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-6", question: "Two trains 100m and 150m cross each other in 10 sec moving opposite. Sum of speeds?", questionHi: "100m और 150m ट्रेनें विपरीत दिशा में 10 सेकंड में पार। गति का योग?", options: ["72 km/h", "90 km/h", "100 km/h", "108 km/h"], optionsHi: ["72 km/h", "90 km/h", "100 km/h", "108 km/h"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-7", question: "A can do work in 12 days, B in 18 days. A worked 3 days, B finishes. B worked how many days?", questionHi: "A 12 दिन में, B 18 दिन में। A 3 दिन काम करे, B पूरा करे। B कितने दिन?", options: ["13.5", "15", "16", "18"], optionsHi: ["13.5", "15", "16", "18"], correctAnswer: 0, category: "aptitude", difficulty: "hard" },
  { id: "apt-h-8", question: "Profit when selling at 20% gain is ₹200 more than when selling at 10% gain. Cost price?", questionHi: "20% लाभ पर बेचने पर मुनाफा 10% से ₹200 ज्यादा। लागत मूल्य?", options: ["₹1500", "₹2000", "₹2500", "₹3000"], optionsHi: ["₹1500", "₹2000", "₹2500", "₹3000"], correctAnswer: 1, category: "aptitude", difficulty: "hard" },

  // ==================== GENERAL KNOWLEDGE ====================
  // GK - Easy
  { id: "gk-e-1", question: "Which is the largest planet in our solar system?", questionHi: "सौर मंडल का सबसे बड़ा ग्रह?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], optionsHi: ["मंगल", "बृहस्पति", "शनि", "नेप्च्यून"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-2", question: "What is the capital of Japan?", questionHi: "जापान की राजधानी?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], optionsHi: ["सियोल", "टोक्यो", "बीजिंग", "बैंकॉक"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-3", question: "Who wrote 'Romeo and Juliet'?", questionHi: "'रोमियो और जूलियट' किसने लिखी?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], optionsHi: ["चार्ल्स डिकेंस", "विलियम शेक्सपियर", "जेन ऑस्टेन", "मार्क ट्वेन"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-4", question: "Which element has symbol 'O'?", questionHi: "किस तत्व का प्रतीक 'O' है?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], optionsHi: ["सोना", "ऑक्सीजन", "ऑस्मियम", "ओगनेसन"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-5", question: "How many continents are there?", questionHi: "कितने महाद्वीप हैं?", options: ["5", "7", "6", "8"], optionsHi: ["5", "7", "6", "8"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-6", question: "What is the national animal of India?", questionHi: "भारत का राष्ट्रीय पशु?", options: ["Lion", "Tiger", "Elephant", "Peacock"], optionsHi: ["शेर", "बाघ", "हाथी", "मोर"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-7", question: "Which ocean is the largest?", questionHi: "सबसे बड़ा महासागर?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], optionsHi: ["अटलांटिक", "प्रशांत", "हिंद", "आर्कटिक"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  { id: "gk-e-8", question: "How many colors in a rainbow?", questionHi: "इंद्रधनुष में कितने रंग?", options: ["5", "7", "6", "8"], optionsHi: ["5", "7", "6", "8"], correctAnswer: 1, category: "gk", difficulty: "easy" },
  
  // GK - Medium
  { id: "gk-m-1", question: "Which country is 'Land of Rising Sun'?", questionHi: "उगते सूरज का देश?", options: ["China", "Japan", "Thailand", "South Korea"], optionsHi: ["चीन", "जापान", "थाईलैंड", "दक्षिण कोरिया"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-2", question: "In which year did India gain independence?", questionHi: "भारत को स्वतंत्रता कब मिली?", options: ["1945", "1947", "1950", "1952"], optionsHi: ["1945", "1947", "1950", "1952"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-3", question: "What is the currency of Switzerland?", questionHi: "स्विट्जरलैंड की मुद्रा?", options: ["Euro", "Swiss Franc", "Swiss Dollar", "Swiss Mark"], optionsHi: ["यूरो", "स्विस फ्रैंक", "स्विस डॉलर", "स्विस मार्क"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-4", question: "Which planet is the 'Red Planet'?", questionHi: "लाल ग्रह कौन सा है?", options: ["Venus", "Mars", "Jupiter", "Mercury"], optionsHi: ["शुक्र", "मंगल", "बृहस्पति", "बुध"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-5", question: "Who invented the telephone?", questionHi: "टेलीफोन का आविष्कार किसने किया?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"], optionsHi: ["थॉमस एडिसन", "अलेक्जेंडर ग्राहम बेल", "निकोला टेस्ला", "गुग्लिएल्मो मार्कोनी"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-6", question: "Who is the current CEO of Tesla?", questionHi: "टेस्ला के वर्तमान CEO?", options: ["Jeff Bezos", "Elon Musk", "Tim Cook", "Sundar Pichai"], optionsHi: ["जेफ बेजोस", "एलन मस्क", "टिम कुक", "सुंदर पिचाई"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-7", question: "Which is the smallest country by area?", questionHi: "क्षेत्रफल में सबसे छोटा देश?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], optionsHi: ["मोनाको", "वेटिकन सिटी", "सैन मैरिनो", "लिकटेंस्टीन"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  { id: "gk-m-8", question: "Who painted the Mona Lisa?", questionHi: "मोना लिसा किसने बनाई?", options: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Picasso"], optionsHi: ["माइकलएंजेलो", "लियोनार्डो दा विंची", "वैन गॉग", "पिकासो"], correctAnswer: 1, category: "gk", difficulty: "medium" },
  
  // GK - Hard
  { id: "gk-h-1", question: "Hardest natural substance on Earth?", questionHi: "पृथ्वी पर सबसे कठोर प्राकृतिक पदार्थ?", options: ["Gold", "Diamond", "Iron", "Platinum"], optionsHi: ["सोना", "हीरा", "लोहा", "प्लैटिनम"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-2", question: "Which vitamin is produced by sunlight exposure?", questionHi: "सूर्य की रोशनी से कौन सा विटामिन बनता है?", options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin E"], optionsHi: ["विटामिन A", "विटामिन D", "विटामिन C", "विटामिन E"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-3", question: "Longest river in Asia?", questionHi: "एशिया की सबसे लंबी नदी?", options: ["Ganges", "Yangtze", "Mekong", "Indus"], optionsHi: ["गंगा", "यांग्त्सी", "मेकांग", "सिंधु"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-4", question: "First woman to win Nobel Prize?", questionHi: "नोबेल जीतने वाली पहली महिला?", options: ["Mother Teresa", "Marie Curie", "Rosalind Franklin", "Jane Addams"], optionsHi: ["मदर टेरेसा", "मैरी क्यूरी", "रोज़ालिंड फ्रैंकलिन", "जेन एडम्स"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-5", question: "Smallest bone in human body?", questionHi: "मानव शरीर की सबसे छोटी हड्डी?", options: ["Hammer", "Stapes", "Anvil", "Phalanx"], optionsHi: ["हैमर", "स्टेपीज़", "एनविल", "फैलेंक्स"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-6", question: "Who discovered penicillin?", questionHi: "पेनिसिलिन की खोज किसने की?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Robert Koch"], optionsHi: ["लुई पाश्चर", "अलेक्जेंडर फ्लेमिंग", "जोसेफ लिस्टर", "रॉबर्ट कोच"], correctAnswer: 1, category: "gk", difficulty: "hard" },
  { id: "gk-h-7", question: "What is the chemical formula for table salt?", questionHi: "नमक का रासायनिक सूत्र?", options: ["NaCl", "NaCl2", "Na2Cl", "KCl"], optionsHi: ["NaCl", "NaCl2", "Na2Cl", "KCl"], correctAnswer: 0, category: "gk", difficulty: "hard" },
  { id: "gk-h-8", question: "Who wrote 'The Theory of Relativity'?", questionHi: "'सापेक्षता का सिद्धांत' किसने लिखा?", options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"], optionsHi: ["आइजैक न्यूटन", "अल्बर्ट आइंस्टीन", "स्टीफन हॉकिंग", "नील्स बोर"], correctAnswer: 1, category: "gk", difficulty: "hard" },

  // ==================== LOGICAL REASONING ====================
  // Logical - Easy
  { id: "log-e-1", question: "If all birds fly, and sparrow is a bird, can sparrow fly?", questionHi: "सभी पक्षी उड़ते हैं, गौरैया पक्षी है, क्या गौरैया उड़ सकती है?", options: ["No", "Yes", "Maybe", "Cannot say"], optionsHi: ["नहीं", "हाँ", "शायद", "कह नहीं सकते"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-2", question: "Complete: A, C, E, G, __", questionHi: "पूरा करें: A, C, E, G, __", options: ["H", "I", "J", "K"], optionsHi: ["H", "I", "J", "K"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-3", question: "APPLE → ELPPA, BANANA → ?", questionHi: "APPLE → ELPPA, BANANA → ?", options: ["ANNABA", "ANANAB", "BANANA", "NABANA"], optionsHi: ["ANNABA", "ANANAB", "BANANA", "NABANA"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-4", question: "Odd one out: Apple, Banana, Carrot, Mango", questionHi: "अलग खोजें: सेब, केला, गाजर, आम", options: ["Apple", "Carrot", "Banana", "Mango"], optionsHi: ["सेब", "गाजर", "केला", "आम"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-5", question: "What comes next: 1, 4, 9, 16, __?", questionHi: "आगे: 1, 4, 9, 16, __?", options: ["20", "25", "30", "36"], optionsHi: ["20", "25", "30", "36"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-6", question: "If CAT = 24, DOG = ?", questionHi: "अगर CAT = 24, DOG = ?", options: ["25", "26", "27", "28"], optionsHi: ["25", "26", "27", "28"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-7", question: "Odd one out: Circle, Square, Triangle, Cube", questionHi: "अलग खोजें: वृत्त, वर्ग, त्रिभुज, घन", options: ["Circle", "Cube", "Square", "Triangle"], optionsHi: ["वृत्त", "घन", "वर्ग", "त्रिभुज"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  { id: "log-e-8", question: "Complete: 2, 4, 8, 16, __", questionHi: "पूरा करें: 2, 4, 8, 16, __", options: ["24", "32", "28", "36"], optionsHi: ["24", "32", "28", "36"], correctAnswer: 1, category: "logical", difficulty: "easy" },
  
  // Logical - Medium
  { id: "log-m-1", question: "A is B's brother, B is C's sister, C is D's father. A to D?", questionHi: "A, B का भाई, B, C की बहन, C, D का पिता। A का D से?", options: ["Grandfather", "Uncle", "Father", "Brother"], optionsHi: ["दादा", "चाचा", "पिता", "भाई"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  { id: "log-m-2", question: "If LAMP = 7+1+13+16, BULB = ?", questionHi: "अगर LAMP = 7+1+13+16, BULB = ?", options: ["2+21+12+2", "2+21+7+2", "1+20+11+1", "2+20+11+1"], optionsHi: ["2+21+12+2", "2+21+7+2", "1+20+11+1", "2+20+11+1"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  { id: "log-m-3", question: "All doctors are teachers. Some teachers are lawyers. Are some doctors lawyers?", questionHi: "सभी डॉक्टर शिक्षक हैं। कुछ शिक्षक वकील हैं। क्या कुछ डॉक्टर वकील हैं?", options: ["True", "False", "Cannot determine", "Partially true"], optionsHi: ["सही", "गलत", "निर्धारित नहीं", "आंशिक सही"], correctAnswer: 2, category: "logical", difficulty: "medium" },
  { id: "log-m-4", question: "Ram said 'She is my mother's only daughter-in-law's sister'. Who is she?", questionHi: "राम ने कहा 'वह मेरी माँ की इकलौती बहू की बहन है'। वह कौन है?", options: ["Mother", "Sister-in-law", "Wife's sister", "Aunt"], optionsHi: ["माँ", "भाभी", "पत्नी की बहन", "मौसी"], correctAnswer: 2, category: "logical", difficulty: "medium" },
  { id: "log-m-5", question: "If 2+3=10, 3+4=21, 4+5=36, then 5+6=?", questionHi: "अगर 2+3=10, 3+4=21, 4+5=36, तो 5+6=?", options: ["45", "55", "65", "75"], optionsHi: ["45", "55", "65", "75"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  { id: "log-m-6", question: "If ROSE is coded as 6821, CHAIR = ?", questionHi: "अगर ROSE = 6821, CHAIR = ?", options: ["39456", "73456", "39654", "73654"], optionsHi: ["39456", "73456", "39654", "73654"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  { id: "log-m-7", question: "Find missing: 3, 6, 11, 18, __, 38", questionHi: "खाली भरें: 3, 6, 11, 18, __, 38", options: ["25", "27", "29", "31"], optionsHi: ["25", "27", "29", "31"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  { id: "log-m-8", question: "Pointing to a girl, Ram said 'Her father is my father's only son'. How is girl related to Ram?", questionHi: "लड़की की ओर इशारा कर राम ने कहा 'उसके पिता मेरे पिता के इकलौते बेटे हैं'। लड़की राम की?", options: ["Sister", "Daughter", "Niece", "Cousin"], optionsHi: ["बहन", "बेटी", "भतीजी", "चचेरी बहन"], correctAnswer: 1, category: "logical", difficulty: "medium" },
  
  // Logical - Hard
  { id: "log-h-1", question: "In row of 40, X is 13th from left. Position from right?", questionHi: "40 की पंक्ति में X बाएं से 13वां। दाएं से स्थान?", options: ["27th", "28th", "29th", "30th"], optionsHi: ["27वां", "28वां", "29वां", "30वां"], correctAnswer: 1, category: "logical", difficulty: "hard" },
  { id: "log-h-2", question: "If A>B, B>C, C>D, then A>D?", questionHi: "अगर A>B, B>C, C>D, तो A>D?", options: ["False", "True", "Cannot say", "Sometimes"], optionsHi: ["गलत", "सही", "कह नहीं सकते", "कभी-कभी"], correctAnswer: 1, category: "logical", difficulty: "hard" },
  { id: "log-h-3", question: "A is son of B. C's mother is B. D is C's brother. A to D?", questionHi: "A, B का बेटा। C की माँ B। D, C का भाई। A का D से?", options: ["Father", "Brother", "Uncle", "Cousin"], optionsHi: ["पिता", "भाई", "चाचा", "चचेरा भाई"], correctAnswer: 1, category: "logical", difficulty: "hard" },
  { id: "log-h-4", question: "Continue: 1, 1, 2, 3, 5, 8, __", questionHi: "आगे: 1, 1, 2, 3, 5, 8, __", options: ["11", "13", "15", "17"], optionsHi: ["11", "13", "15", "17"], correctAnswer: 1, category: "logical", difficulty: "hard" },
  { id: "log-h-5", question: "If GREEN = 49, BROWN = ?", questionHi: "अगर GREEN = 49, BROWN = ?", options: ["55", "57", "59", "61"], optionsHi: ["55", "57", "59", "61"], correctAnswer: 1, category: "logical", difficulty: "hard" },
  { id: "log-h-6", question: "All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly?", questionHi: "सभी गुलाब फूल हैं। कुछ फूल जल्दी मुरझाते हैं। निष्कर्ष: कुछ गुलाब जल्दी मुरझाते हैं?", options: ["True", "False", "Cannot determine", "Always false"], optionsHi: ["सही", "गलत", "निर्धारित नहीं", "हमेशा गलत"], correctAnswer: 2, category: "logical", difficulty: "hard" },
  { id: "log-h-7", question: "What comes next: J, F, M, A, M, J, __", questionHi: "आगे क्या: J, F, M, A, M, J, __", options: ["J", "A", "S", "O"], optionsHi: ["J", "A", "S", "O"], correctAnswer: 0, category: "logical", difficulty: "hard" },
  { id: "log-h-8", question: "If 1=5, 2=25, 3=325, 4=?", questionHi: "अगर 1=5, 2=25, 3=325, 4=?", options: ["4325", "5325", "3254", "4253"], optionsHi: ["4325", "5325", "3254", "4253"], correctAnswer: 0, category: "logical", difficulty: "hard" },
]

export function getReward(difficulty: "easy" | "medium" | "hard"): number {
  const rewards = { easy: 1000, medium: 5000, hard: 10000 }
  return rewards[difficulty]
}

/**
 * Get a random question from the specified category and difficulty.
 * If all questions have been answered, it will return a random question
 * from the full pool (allowing unlimited attempts).
 */
export function getRandomQuestion(
  category: "maths" | "aptitude" | "gk" | "logical",
  difficulty: "easy" | "medium" | "hard",
  answeredIds: Set<string> = new Set()
): Question | null {
  const allInCategory = questions.filter(
    (q) => q.category === category && q.difficulty === difficulty
  )
  
  // If no questions exist for this category/difficulty
  if (allInCategory.length === 0) return null
  
  // Try to get unanswered questions first
  const unanswered = allInCategory.filter((q) => !answeredIds.has(q.id))
  
  // If all questions answered, allow repeating (unlimited mode)
  if (unanswered.length === 0) {
    return allInCategory[Math.floor(Math.random() * allInCategory.length)]
  }
  
  return unanswered[Math.floor(Math.random() * unanswered.length)]
}

/**
 * Get question counts for a category/difficulty.
 * Shows "unlimited" indicator when all questions have been answered once.
 */
export function getQuestionCount(
  category: "maths" | "aptitude" | "gk" | "logical",
  difficulty: "easy" | "medium" | "hard",
  answeredIds: Set<string> = new Set()
): { total: number; remaining: number; unlimited: boolean } {
  const all = questions.filter((q) => q.category === category && q.difficulty === difficulty)
  const remaining = all.filter((q) => !answeredIds.has(q.id))
  // When all answered, questions can repeat (unlimited mode)
  const unlimited = remaining.length === 0 && all.length > 0
  return { total: all.length, remaining: unlimited ? all.length : remaining.length, unlimited }
}
