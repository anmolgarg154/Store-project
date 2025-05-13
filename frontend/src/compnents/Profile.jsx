import { connect } from "react-redux";

function MyProfile({ commonData }) {
    const profile = commonData.profile;
console.log(profile)
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                <div className="text-xl font-semibold bg-blue-600 text-white px-6 py-4">
                    My Profile
                </div>
                <table className="min-w-full table-auto text-left text-gray-700">
                    <tbody>
                        <tr className="border-b">
                            <td className="px-6 py-4 font-medium w-1/3">Role:</td>
                            <td className="px-6 py-4">{profile.role}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-4 font-medium w-1/3">Email:</td>
                            <td className="px-6 py-4">{profile.email}</td>
                        </tr>
                        <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium">Password:</td>
                            <td className="px-6 py-4">XXXXXXXX</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-4 font-medium">First Name:</td>
                            <td className="px-6 py-4">{profile.name}</td>
                        </tr>
                        <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4 font-medium">Address:</td>
                            <td className="px-6 py-4">{profile?.address || "india"}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-4 font-medium">Pin Code:</td>
                            <td className="px-6 py-4">{profile.role}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const connectToStore = (state) => ({ commonData: state });

export default connect(connectToStore)(MyProfile);
