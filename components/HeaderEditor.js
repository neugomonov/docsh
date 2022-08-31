import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/client";
import React from "react";
import Login from "./Login";

function HeaderEditor() {
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
        <header className="flex justify-between items-start p-3 pb-1">
            <span onClick={() => router.push("/")} className="cursor-pointer">
                <Button
                    color="gray"
                    buttonType="outline"
                    iconOnly={true}
                    ripple="dark"
                    className="border-0 h-18"
                >
                    <Icon name="description" size="5xl" color="blue"></Icon>
                </Button>
            </span>
            <div className="flex-grow px-2">
                <h2>{snapshot?.data()?.fileName}</h2>
                <div className="flex flex-wrap items-center text-sm space-x-1 -ml-1  text-gray-600">
                    <p className="option">File</p>
                    <p className="option">Edit</p>
                    <p className="option">View</p>
                    <p className="option">Insert</p>
                    <p className="option">Format</p>
                    <p className="option">Tools</p>
                </div>
            </div>
            <Button
                color="blue"
                buttonType="filled"
                size="regular"
                className="hidden md:inline-flex h-10"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
            >
                <Icon name="people" size="md" />
                Share
            </Button>
            <Button
                color="gray"
                buttonType="outline"
                iconOnly={true}
                rounded={true}
                ripple="dark"
                className="ml-2 border-0 h-14"
            >
                <img
                    className="cursor-pointer rounded-full"
                    src={session.user.image}
                    alt=""
                />
            </Button>
        </header>
    );
}

export default HeaderEditor;
