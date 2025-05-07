import { Container, IconButton } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { LuLogIn, LuLogOut } from "react-icons/lu";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Container display="flex" flexDirection="column" alignItems="flex-end">
        Signed in as {session.user.name} <br />
        <IconButton onClick={() => signOut()}>
          <LuLogOut />
        </IconButton>
      </Container>
    );
  }
  return (
    <Container display="flex" flexDirection="column" alignItems="flex-end">
      Not signed in <br />
      <IconButton onClick={() => signIn()}>
        <LuLogIn />
      </IconButton>
    </Container>
  );
}
