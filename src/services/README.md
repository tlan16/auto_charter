# Overview

The files under the `services` directory implement business logics.

If data from a persistence storage such as database is required, the service function should either call a repository function, which fetches the data, or take the data via argument(s).
