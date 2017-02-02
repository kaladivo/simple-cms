import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  sendmail: true
});