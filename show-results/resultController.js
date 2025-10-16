import client from "./db.js";

export const getResults = async (req, res) => {
  try {
    const db = client.db(process.env.MONGO_DB);
    const results = await db.collection(process.env.MONGO_COLLECTION).find({}).toArray();
    res.json(results);
  } catch (error) {
    console.error("Error fetching results:", error.message);
    res.status(500).json({ message: "Error fetching results" });
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const db = client.db(process.env.MONGO_DB);
    const student = await db
      .collection(process.env.MONGO_COLLECTION)
      .findOne({ student: req.params.studentName });

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student data" });
  }
};
