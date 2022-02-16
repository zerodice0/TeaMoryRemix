import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link as RemixLink } from "remix";

export const TitleBar = () => {
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    console.log(cookie);
  });

  const _fetchSessionMenu = () => {
    if (cookie.userInformation) {
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              Logout
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RemixLink} to="/signin">
              Sign in
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RemixLink} to="/signup">
              Sign up
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
  }

  return (
    <Flex bg="#9cbfa7" shadow="dark-lg">
      <Center>
        <Heading p="2">
          TeaMory
        </Heading>
      </Center>
      <Spacer />
      <Box p="4">
        <Center>
        {_fetchSessionMenu()}
        </Center>
      </Box>
    </Flex>
  );
}