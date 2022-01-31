import { useRef, useState } from "react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { Flex, Stack, Text, FormControl, InputGroup, InputLeftElement, Input, Button, Box, Heading } from "@chakra-ui/react";
import { Form } from "remix";
import { FirebaseError } from "@firebase/app";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const signUp = async () => {
    const email:string = emailRef?.current?.value ?? "";
    const password:string = passwordRef?.current?.value ?? "";
  
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage(null);

    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);
    } catch(error) {
      if (error instanceof FirebaseError) {
        let emailError = false;
        let passwordError = false;

        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("이미 사용중인 이메일입니다.");
            emailError = true;
            break;
          case "auth/invalid-email":
            setErrorMessage("유효하지 않은 이메일입니다.");
            emailError = true;
            break;
          case "auth/weak-password":
            setErrorMessage("6자 이상의 비밀번호를 사용해주세요.");
            passwordError = true;
          break;
          default:
            setErrorMessage("알 수 없는 오류가 발생했습니다.");
          break;
        }

        setEmailError(emailError);
        setPasswordError(passwordError);
      }
    }
  }

  return (
    <Flex flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center">
        <Box
          rounded="lg"
          shadow="dark-lg">
          <Form>
            <Stack
              flexDir="column"
              mb="2"
              p="1rem"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Heading as="h1" color="#9cbfa7">
                Sign in
              </Heading>
              <Text color="#9cbfa7">
                share your memory about tea to your friends!
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon color="#9cbfa7" />} />
                  <Input
                    isRequired={true}
                    ref={emailRef}
                    placeholder="email address"
                    color="#9cbfa7"
                    focusBorderColor="#9cbfa7"
                    errorBorderColor="#ff5e5b"
                    isInvalid={isEmailError}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="#9cbfa7" />} />
                  <Input
                    type="password"
                    isRequired={true}
                    ref={passwordRef}
                    placeholder="password"
                    color="#9cbfa7"
                    focusBorderColor="#9cbfa7"
                    errorBorderColor="#ff5e5b"
                    isInvalid={isPasswordError}
                  />
                </InputGroup>
              </FormControl>
              <Button 
                w="100%"
                onClick={() => signUp()}
                color="#5A5353"
                background="#9cbfa7"
              >
                Sign In
              </Button>
              {
                errorMessage
                && <Text color="#ff5e5b">
                  {errorMessage}
                </Text>
              }
            </Stack>
          </Form>
        </Box>
    </Flex>
  );
}

export default SignUp;
