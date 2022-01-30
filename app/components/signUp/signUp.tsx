import { useState } from "react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { Flex, Stack, Text, FormControl, InputGroup, InputLeftElement, Input, Button, Box, Heading } from "@chakra-ui/react";
import { Form } from "remix";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    console.log(user);
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
                TeaMory
              </Heading>
              <Text color="#9cbfa7">
                share your memory about tea to your friends!
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon color="#9cbfa7" />} />
                  <Input
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email address"
                    color="#9cbfa7"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="#9cbfa7" />} />
                  <Input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="password"
                    color="#9cbfa7"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<LockIcon color="#9cbfa7" />} />
                  <Input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Confirm password"
                    color="#9cbfa7"
                  />
                </InputGroup>
              </FormControl>
              <Button 
                w="100%"
                onClick={() => signUp()}
                color="#5A5353"
                background="#9cbfa7"
              >
                Sign up
              </Button>
            </Stack>
          </Form>
        </Box>
    </Flex>
  );
}

export default SignUp;
