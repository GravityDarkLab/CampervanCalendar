<template>
  <div class="home flex flex-col items-center min-h-screen bg-gray-50 text-gray-700 p-10 space-y-8">
    <div class="animate-fade-in-down">
      <h1 class="text-5xl font-bold text-center">Welcome to Campervan Calendar</h1>
      <p class="text-xl text-center mt-4">
        Effortlessly manage campervan bookings with a seamless scheduling experience.
      </p>
    </div>
    <div class="text-lg animate-fade-in p-20">
      <h2 class="font-semibold text-center mb-4">Features</h2>
      <ul class="list-disc list-inside space-y-2 text-center">
        <li>Weekly calendar view with past and future navigation</li>
        <li>Comprehensive bookings list for any selected week</li>
        <li>Quick navigation to today's date for current bookings</li>
        <li>Multi-station management for location-specific bookings</li>
        <li>Detailed booking information with a single click</li>
      </ul>
    </div>
    <!-- Social icons section -->
    <div class="animate-fade-in-up flex space-x-4">
      <a href="https://www.linkedin.com/in/ashraf-labidi-0xff3e/" target="_blank">
        <!-- LinkedIn Icon SVG -->
        <img src="../../linkedin.svg" alt="LinkedIn Icon" class="h-8 w-8 text-blue-700" />
      </a>
      <a href="https://github.com/GravityDarkLab" target="_blank">
        <!-- GitHub Icon SVG -->
        <img src="../../github.svg" alt="GitHub Icon" class="h-8 w-8 text-gray-800" />
      </a>
    </div>
  </div>
</template>

<style>
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
