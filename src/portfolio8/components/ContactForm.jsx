import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as Z from "zod";

const contactFormSchema = Z.object({
  name: Z.string().nonempty("Name is required"),
  email: Z.string().email("Invalid email").nonempty("Email is required"),
  subject: Z.string().nonempty("Subject is required"),
  message: Z.string().nonempty("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    if (!recaptchaValue) {
      setRecaptchaError("Please verify that you are not a robot.");
      return;
    }
    setRecaptchaError("");
    setLoading(true);
    try {
      const payload = {
        from_name: data.name,
        to_name: "Full Stack Developer",
        message: data.message,
        reply_to: data.email,
        subject: data.subject,
      };

      const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
      const userID = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

      await emailjs.send(serviceID, templateID, payload, {
        publicKey: userID,
      });
    } catch (error) {
      console.log("FAILED...", error);
      alert("Failed to send message, please try again.");
    } finally {
      setLoading(false);
      reset(initialValues);
      alert("Message sent successfully!");
    }
  };

  return (
    <div className="flex-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-[#a7a7a7] flex flex-col gap-7"
      >
        <div>
          <label
            className="block text-white md:text-2xl font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Tommy"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label
            className="block md:text-2xl font-semibold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="hello@gmail.com"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            className="block md:text-2xl font-semibold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="Enter your subject"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
          />
          {errors.subject && (
            <span className="text-red-500">{errors.subject.message}</span>
          )}
        </div>

        <div>
          <label
            className="block md:text-2xl font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Enter your message"
            rows="5"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
          ></textarea>
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </div>



        <button
          type="submit"
          className="w-full py-4 bg-blue-50 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
