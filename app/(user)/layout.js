import '../global.scss';
import MainWrapper from "@/Components/MainWrapper/MainWrapper";
import UserWrapper from '@/Components/UserComponents/UserWrapper/UserWrapper';

export const metadata = {
    title: "User - Onetapdrive",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <MainWrapper>
                    <UserWrapper>
                        {children}
                    </UserWrapper>
                </MainWrapper>
            </body>
        </html>
    );
}
