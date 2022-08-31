import { getSession, useSession } from "next-auth/client";
import TextEditor from "../../components/TextEditor";
import HeaderEditor from "../../components/HeaderEditor";
import Login from "../../components/Login";
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

function Doc() {
    const [session] = useSession();
    if (!session) return <Login />;
    const router = useRouter();
    const { id } = router.query;
    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db
            .collection("userDocsh")
            .doc(session.user.email)
            .collection("docsh")
            .doc(id)
    );

    if (!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace("/");
    }

    return (
        <div>
            <HeaderEditor />
            <TextEditor />
        </div>
    );
}

export default Doc;
export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
}
