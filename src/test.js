const date = new Date();
const year = date.getFullYear();
const month =
	date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
const updatedDay = new Date(date);
updatedDay.setDate(updatedDay.getDate() + 24);
const dayString = updatedDay.toDateString();

console.log(dayString);
