
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FactSubmissionForm from "@/components/FactSubmissionForm";

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 px-6 flex-1">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Submit a Claim for Fact-Checking
          </h1>
          <p className="text-muted-foreground">
            Help us combat AI misinformation by submitting claims for our expert team to analyze. 
            We'll verify the information and add it to our database.
          </p>
        </div>
        
        <FactSubmissionForm />
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Submit;
