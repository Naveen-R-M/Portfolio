import React from 'react';
import { Input, Textarea, Button } from '@heroui/react';
import emailjs from 'emailjs-com';

export const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send('service_g49ihzd', 'template_4v3u0if', templateParams, '5tNEif6rXnNsnjDV7')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-content1 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Textarea
          label="Message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <Button type="submit" color="primary">
          Send Message
        </Button>
      </div>
    </form>
  );
};
