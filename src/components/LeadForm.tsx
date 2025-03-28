import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FormData } from '../types';
import { Loader, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDeviceInfo, getLocationInfo } from '../lib/tracking';

const LeadForm: React.FC<{ onSubmit: (data: FormData) => Promise<void> }> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  
  React.useEffect(() => {
    setValue('phone', '+91 ');
  }, [setValue]);

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const deviceInfo = getDeviceInfo();
      const locationInfo = await getLocationInfo();
     

      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: data.name,
            phone: data.phone,
            city: locationInfo,
            email: data.email || null,
            lead_type: data.lead_type,
            comments: data.comments || null,
            device_info: deviceInfo,
            location_info: data.city,
            url_slugs: window.location.pathname.split('/').filter(Boolean)
          }
        ]);

      if (error) throw error;

      await onSubmit(data);
    } catch (error) {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validatePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, 'IN');
    if (!phoneNumber) {
      return 'Invalid phone number';
    }
    return phoneNumber.isValid() || 'Please enter a valid Indian phone number';
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-8 max-w-xl mx-auto"
      autoComplete="on"
    >
      <div className="relative">
        <input
          type="text"
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 3 characters' }
          })}
          placeholder="Your Name"
          autoComplete="name"
          className="luxury-input"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            validate: validatePhoneNumber
          })}
          placeholder="Phone Number"
          autoComplete="tel"
          className="luxury-input"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="relative">
        {/* <input
          type="text"
          {...register('city', { 
            required: 'City is required',
            minLength: { value: 2, message: 'City name must be at least 3 characters' }
          })}
          placeholder="Your City"
          autoComplete="address-level2"
          className="luxury-input"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
        )} */}
      </div>

      <div className="relative">
        <select
          {...register('lead_type', {
            required: 'Please select an option'
          })}
          className="luxury-input"
          defaultValue=""
        >
          
          <option value="" disabled>Please select </option>
           <option value="looking_to_buy">I'm Looking to buy</option>
           <option value="just_curious">I'm Just curious</option>
          <option value="architect">I'm an Architect</option>
          <option value="interior_designer">I'm an Interior Designer</option>
          <option value="other">Other</option>
          
        </select>
        {errors.lead_type && (
          <p className="mt-1 text-sm text-red-500">{errors.lead_type.message}</p>
        )}
      </div>

      <div className="relative">
        {/* <input
          type="email"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          placeholder="Email (Optional)"
          autoComplete="email"
          className="luxury-input"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )} */}
      </div>

      <div className="relative">
        <textarea
          {...register('comments')}
          placeholder="Your Message (Optional)"
          className="luxury-input min-h-[100px] resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1a5f7a] hover:bg-[#2c3e50] text-white font-medium py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center group"
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin mr-2" size={20} />
            Processing...
          </>
        ) : (
          <>
            <span className="mr-2">Get Exclusive Access</span>
            <Send size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>
    </form>
  );
};

export default LeadForm;
