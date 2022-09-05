import {matchRoutes, useLocation} from "react-router-dom";

const routes = [{ path: "/" }, { path: "/inbox" }, { path: "/profile" }, { path: "/signup" }, { path: "/signin" }, {path: '/inbox/chat/:id'}]

export function usePathPattern() {
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location)
    return route.path
}