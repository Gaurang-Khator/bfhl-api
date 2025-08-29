import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "gaurang_khator"; 
const DOB = "22012004"; 
const EMAIL = "gaurangkhator2022@vitbhopal.ac.in";
const ROLL_NO = "22BCE11665";


function alternatingCapsReverse(str) {
  let result = "";
  let upper = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let ch = str[i];
    if (/[a-zA-Z]/.test(ch)) {
      result += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    }
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];
    let odd = [];
    let even = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;
    let letters = [];

    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        letters.push(...item.split(""));
      } else {
        specials.push(item);
      }
    });

    const concatString = alternatingCapsReverse(letters.join(""));

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NO,
      odd_numbers: odd,
      even_numbers: even,
      alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));