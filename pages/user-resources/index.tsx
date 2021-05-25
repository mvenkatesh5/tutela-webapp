import React from "react";
// next imports
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button } from "react-bootstrap";
// swr
import useSWR from "swr";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// layouts
import StudentLayout from "@layouts/studentLayout";
// api routes
import { USER_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";

const Resources = () => {
  const router = useRouter();

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const { data: resources, error: resourcesError } = useSWR(
    tokenDetails && tokenDetails.user ? USER_RESOURCE_VIEW_ENDPOINT(tokenDetails.user.id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  return (
    <div>
      <Head>
        <title>Resources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StudentLayout>
        <Container className="pt-3 pb-3">
          <h3 className="mb-4">Resources</h3>
          {!resources && !resourcesError ? (
            <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
          ) : (
            <div>
              {resources && resources.length === 0 ? (
                <div className="text-secondary mt-5 mb-5 text-center">
                  No resources are available.
                </div>
              ) : (
                <div>
                  {resources.map((resource: any, resourceIndex: number) => (
                    <div key={`resource-title-${resourceIndex}`} className="resource-home-card">
                      <div className="flex">
                        <div className="flex-item title">
                          <div className="resource-title">
                            <Link href={`/user-resources/${resource.id}`}>
                              <a>{resource.resource_node.title}</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </StudentLayout>
    </div>
  );
};

export default withStudentAuth(Resources);
