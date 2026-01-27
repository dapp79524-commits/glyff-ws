import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import DatePicker from './DatePicker'
import { useRegion } from '../../context/RegionContext'

export default function WaitlistForm() {
  const { config, region } = useRegion()
  const universities = config.universities
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    university: '',
    major: '',
    email: '',
    birthday: '',
    gender: '',
    interestedIn: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phone ||
      !formData.university || !formData.email || !formData.birthday ||
      !formData.gender || !formData.interestedIn) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    // Validate email format (accepting any email for now)
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      const { error: submitError } = await supabase
        .from('waitlist')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          university: formData.university,
          major: formData.major || null,
          email: formData.email,
          birthday: formData.birthday,
          gender: formData.gender,
          interested_in: formData.interestedIn,
          region: region,
          created_at: new Date().toISOString()
        }])

      if (submitError) {
        if (submitError.code === '23505') {
          setError('This email is already on the waitlist!')
        } else {
          throw submitError
        }
      } else {
        setIsSubmitted(true)
      }
    } catch (err) {
      console.error('Waitlist submission error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="waitlist-success">
        <div className="success-icon">✓</div>
        <h3>You're on the list!</h3>
        <p>Thanks for joining. We'll reach out soon when Glyff launches at your college.</p>
      </div>
    )
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email * <span style={{ fontWeight: 400, color: '#888' }}>(university email preferred)</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={config.phonePlaceholder}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="university">University *</label>
          <select
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          >
            <option value="">Select university</option>
            {universities.map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="major">Major/Degree</label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="birthday">Birthday *</label>
        <DatePicker
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label className={`radio-pill ${formData.gender === 'man' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={formData.gender === 'man'}
                onChange={handleChange}
              />
              Man
            </label>
            <label className={`radio-pill ${formData.gender === 'woman' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="gender"
                value="woman"
                checked={formData.gender === 'woman'}
                onChange={handleChange}
              />
              Woman
            </label>
            <label className={`radio-pill ${formData.gender === 'non-binary' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="gender"
                value="non-binary"
                checked={formData.gender === 'non-binary'}
                onChange={handleChange}
              />
              Non-binary
            </label>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Interested In *</label>
          <div className="radio-group">
            <label className={`radio-pill ${formData.interestedIn === 'men' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="interestedIn"
                value="men"
                checked={formData.interestedIn === 'men'}
                onChange={handleChange}
              />
              Men
            </label>
            <label className={`radio-pill ${formData.interestedIn === 'women' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="interestedIn"
                value="women"
                checked={formData.interestedIn === 'women'}
                onChange={handleChange}
              />
              Women
            </label>
            <label className={`radio-pill ${formData.interestedIn === 'both' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="interestedIn"
                value="both"
                checked={formData.interestedIn === 'both'}
                onChange={handleChange}
              />
              Both
            </label>
          </div>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button
        type="submit"
        className="btn-primary btn-large btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  )
}
