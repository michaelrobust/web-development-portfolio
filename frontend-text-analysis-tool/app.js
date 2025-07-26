import express from 'express';
const app = express();

// 提供靜態文件服務
app.use(express.static('public'));

// 根路徑提供HTML文件
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});