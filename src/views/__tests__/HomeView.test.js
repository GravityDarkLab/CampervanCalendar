import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  const wrapper = mount(HomeView)

  it('renders the welcome message', () => {
    expect(wrapper.text()).toContain('Welcome to Campervan Calendar')
    expect(wrapper.text()).toContain(
      'Effortlessly manage campervan bookings with a seamless scheduling experience.'
    )
  })

  it('displays the features list', () => {
    const features = [
      'Weekly calendar view with past and future navigation',
      'Comprehensive bookings list for any selected week',
      "Quick navigation to today's date for current bookings",
      'Multi-station management for location-specific bookings',
      'Detailed booking information with a single click'
    ]

    features.forEach((feature) => {
      expect(wrapper.text()).toContain(feature)
    })
  })

  it('includes animation classes', () => {
    expect(wrapper.find('.animate-fade-in-down').exists()).toBe(true)
    expect(wrapper.find('.animate-fade-in').exists()).toBe(true)
    expect(wrapper.find('.animate-fade-in-up').exists()).toBe(true)
  })

  it('contains social icons with correct links', () => {
    const linkedInIcon = wrapper.find('a[href="https://www.linkedin.com/in/ashraf-labidi-0xff3e/"]')
    const githubIcon = wrapper.find('a[href="https://github.com/GravityDarkLab"]')

    expect(linkedInIcon.exists()).toBe(true)
    expect(githubIcon.exists()).toBe(true)
    expect(linkedInIcon.find('img').attributes('alt')).toBe('LinkedIn Icon')
    expect(githubIcon.find('img').attributes('alt')).toBe('GitHub Icon')
  })
})
