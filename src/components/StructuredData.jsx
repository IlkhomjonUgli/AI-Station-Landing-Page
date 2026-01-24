import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * StructuredData Component - Injects JSON-LD structured data into page
 *
 * @param {object|array} data - JSON-LD structured data object or array of objects
 *
 * Example usage:
 * <StructuredData data={generateOrganizationSchema()} />
 *
 * or multiple schemas:
 * <StructuredData data={[
 *   generateOrganizationSchema(),
 *   generateLocalBusinessSchema()
 * ]} />
 */
const StructuredData = ({ data }) => {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <Helmet key={index}>
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        </Helmet>
      ))}
    </>
  );
};

export default StructuredData;
