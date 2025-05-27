
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberDashboard from "@/components/MemberDashboard";

const MemberDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MemberDashboard />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemberDashboardPage;
