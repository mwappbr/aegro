# Legacy PHP 5 Application - Docker Container
# NOTE: This is intentionally using an old PHP version for demonstration purposes
# DO NOT use this in production!

FROM php:5.6-apache

# Install MySQL extension (deprecated but needed for this legacy app)
RUN docker-php-ext-install mysql mysqli

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Create uploads directory with proper permissions
RUN mkdir -p /var/www/html/uploads && \
    chmod 777 /var/www/html/uploads

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
