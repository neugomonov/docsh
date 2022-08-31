import Head from "next/head";
import Header from "../components/Header";
import Icon from "@material-tailwind/react/Icon";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import { db } from "../firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";
import NewDocument from "../components/NewDocument";

export default function Home() {
    const [session] = useSession();
    if (!session) return <Login />;

    const [snapshot] = useCollectionOnce(
        db
            .collection("userDocsh")
            .doc(session.user.email)
            .collection("docsh")
            .orderBy("timestamp", "desc")
    );

    return (
        <div>
            <Head>
                <title>Docsh</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <NewDocument />
            <section className=" bg-white px-10">
                <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
                    <div className="flex items-center justify-between pb-5">
                        <h2 className="font-medium flex-grow">My documents</h2>
                        <p className="mr-12">Date Created</p>
                        <Icon name="folder" size="3xl" color="gray"></Icon>
                    </div>
                    {snapshot?.docs.map((doc) => (
                        <DocumentRow
                            key={doc.id}
                            id={doc.id}
                            fileName={doc.data().fileName}
                            date={doc.data().timestamp}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
}
