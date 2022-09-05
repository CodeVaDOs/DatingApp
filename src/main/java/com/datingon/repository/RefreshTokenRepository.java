package com.datingon.repository;

import com.datingon.entity.RefreshToken;
import org.springframework.stereotype.Repository;
import java.util.Date;

@Repository
public interface RefreshTokenRepository extends RepositoryInterface<RefreshToken> {
    void deleteByExpirationDateBefore(Date date);
}