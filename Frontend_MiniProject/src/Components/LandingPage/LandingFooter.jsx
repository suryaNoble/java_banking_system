const LandingFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Online Banking System. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default LandingFooter;