import { HttpInterceptorFn } from "@angular/common/http";

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
    const clonedReq = req.clone({ withCredentials: true });
    return next(clonedReq);
};
