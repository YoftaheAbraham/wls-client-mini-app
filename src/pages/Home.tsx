import { useData } from '../context/context';

const Home = () => {
    const data = useData()

    if (!data?.data.student_info) return (
        <div className="flex items-center justify-center min-h-screen bg-[#17212B]">
            <div className="text-center p-6">
                <div className="w-16 h-16 border-4 border-[#2B3B4D] border-t-[#54A7E5] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#A4B8D1] font-medium">Loading your dashboard...</p>
            </div>
        </div>
    );

    const { full_name, grade, current_class, portrait, std_id, email } = data.data.student_info;
    const firstName = full_name.split(' ')[0];

    // School information
    const schoolInfo = {
        name: "Wolaita Liqa School",
        motto: "Knowledge, Integrity, Excellence",
        address: "P.O. Box 123, Wolaita Sodo, Ethiopia",
        phone: "+251-46-551-24-74",
        email: "wolaitta@gmail.com",
        logo: "https://wolaita-liqa-school.netlify.app/static/logo-B3HMawlj.jpg" // Replace with actual logo URL
    };

    return (
        <div className="min-h-screen bg-[#17212B] pb-24">
            {/* School Header with Logo */}
            <div className="bg-[#1E2C3A] py-4 px-6 flex items-center border-b border-[#2B3B4D]">
                <img 
                    src={schoolInfo.logo} 
                    alt="School Logo" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#54A7E5]"
                />
                <div className="ml-4">
                    <h1 className="text-lg font-bold text-[#E1E9F1]">{schoolInfo.name}</h1>
                    <p className="text-xs text-[#A4B8D1]">{schoolInfo.motto}</p>
                </div>
            </div>

            {/* Welcome Header */}
            <div className="pt-6 px-6 text-center">
                <h1 className="text-2xl font-bold text-[#E1E9F1] mb-1">Welcome back, {firstName}!</h1>
                <p className="text-[#54A7E5]">Your academic journey at a glance</p>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-center my-6">
                <div className="relative">
                    <img
                        src={portrait}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#1E2C3A] shadow-lg"
                        alt="Student portrait"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#54A7E5] text-white rounded-full px-2 py-1 text-xs font-bold shadow">
                        Grade {grade}
                    </div>
                </div>
            </div>

            {/* Student Info Card */}
            <div className="mx-6 mb-8 bg-[#1E2C3A] rounded-xl shadow-sm p-5 border border-[#2B3B4D]">
                <h3 className="text-[#A4B8D1] font-medium text-sm uppercase tracking-wider mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Full Name</p>
                        <p className="font-medium text-[#E1E9F1]">{full_name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Class</p>
                        <p className="font-medium text-[#E1E9F1]">{current_class.grade ? `Grade ${current_class.grade}${current_class.section}` : `Grade ${grade}`}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Student ID</p>
                        <p className="font-medium text-[#E1E9F1]">{std_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Email</p>
                        <p className="font-medium text-[#E1E9F1] truncate">{email ? email : "Not specified"}</p>
                    </div>
                </div>
            </div>

            {/* School Information Card */}
            <div className="mx-6 mb-8 bg-[#1E2C3A] rounded-xl shadow-sm p-5 border border-[#2B3B4D]">
                <h3 className="text-[#A4B8D1] font-medium text-sm uppercase tracking-wider mb-3">School Information</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Address</p>
                        <p className="font-medium text-[#E1E9F1]">{schoolInfo.address}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#7A8EA3] font-medium uppercase tracking-wider">Contact</p>
                        <p className="font-medium text-[#E1E9F1]">{schoolInfo.phone}</p>
                        <p className="font-medium text-[#E1E9F1]">{schoolInfo.email}</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default Home;